const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');
const ipc = ipcMain;
const dialog = require('electron').dialog;
const sizeOf = require('image-size');
const fetch = require('node-fetch');

// Move these anki variables and methods to another file
let DEFAULT_ANKI_DECK = "test1"
let DEFAULT_ANKI_MODEL = "Manga-OCR-Sentence"
let ANKI_CONNECT_ENDPOINT = "http://localhost:8765/"

function evokeAnki(action, params){
    try {
        let post = {}
        post["action"] = action
        post["version"] = 6
        post["params"] = params

        fetch(ANKI_CONNECT_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        })
    } catch (error) {
        console.log(error)
    }
}

function initializeAnkiDeck(){
    evokeAnki("createDeck", {"deck":DEFAULT_ANKI_DECK})
}

function initializeAnkiModel(){
    let cardModelParams = {
        "modelName":DEFAULT_ANKI_MODEL, 
        "inOrderFields":["Word","Definition","Sentence"],
        "isCloze":false,
        "cardTemplates":[{
            "Name":DEFAULT_ANKI_MODEL, 
            "Front": "<h1> {{Word}} </h1>", 
            "Back": "<h1> {{Word}} </h1> {{Definition}} <hr> {{Sentence}}"
        }]
    }
    evokeAnki('createModel', cardModelParams)
}

function addAnkiNote(word,definition,sentence){
    let noteParams = {
        "note":{
            "deckName":DEFAULT_ANKI_DECK,
            "modelName":DEFAULT_ANKI_MODEL,
            "fields":{
                "Word":word,
                "Definition":definition,
                "Sentence":sentence,
            },
            "options":{
                "allowDuplicate":false,
                "duplicateScope":"deck"
            },
            "tags":["Manga-OCR"]
        }
    }
    evokeAnki("addNote", noteParams)
}
function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        autoHideMenuBar: true,
        frame: false,
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // This preload file globally defines our IPC, so that the renderer can use it. Also, it lets react browser window not crash since it is defined at time of launch or something.
            preload: __dirname + "/preload.js",
            // devTools: true,
        },
    })

    win.loadURL('http://localhost:3000/')

    // Open the DevTools.
    if (isDev) {
        // win.webContents.openDevTools({ mode: 'detach' });
    }

    ipc.on('minimizeApp', ()=>{
        console.log("IPC: minimize event");
        win.minimize();
    })

    ipc.on('maximizeApp', ()=>{
        console.log("IPC: maximize event");
        if( win.isMaximized() ){
            win.restore(); // Returns from fullscreen mode to some set size
        }
        else{
            win.maximize();
        }
    })

    ipc.on('closeApp', ()=>{
        console.log("IPC: close event");
        win.close();
    })

    ipc.on('open-dir-dialog', async (event)=>{
        console.log("Opening directory browser");
        
        dialog.showOpenDialog(
            {properties: ['openDirectory']},
        ).then( async (dir) => {
            if (dir === undefined) return;
            let dirPath = dir.filePaths[0];
            let pages = [];

            const files = fs.readdirSync(dirPath)
            // counter so that at last .foreach iter we ipc send
            let filesProcessed = 0; 

            // Move to other function, figure out how to make it not block UI thread
            files.forEach( (file) => {
                let absFilePath = path.join(dirPath, file);
                let fileBase64 = fs.readFileSync(absFilePath, 'base64')
                const dimensions = sizeOf( Buffer.from(fileBase64, 'base64') );
                const page = {}
                page["base64"] = fileBase64
                page["width"] = dimensions.width
                page["height"] = dimensions.height
                
                // put the pages through the model here
                const data = fileBase64;
                const headers = {
                    'content-type': 'image/jpg',
                    'body':data,
                    'method': 'post',
                }
                const url = "http://localhost:5000/infer"
                fetch(url, headers).then( (res) =>{
                    res.json()
                    .then( (boxes) => {
                        console.log(boxes)
                        page['boxes'] = boxes
                        pages.push(page);
                        filesProcessed++;
                    })
                    .then( () => {
                        if ( filesProcessed === files.length){
                            console.log("EVENT SENDER | post-manga-folder");
                            event.sender.send('post-manga-folder', pages);
                        } else {
                            console.log("EVENT SENDER | error-empty-folder");
                            event.sender.send('error-empty-folder')
                        }
                    })
                })
            })
        })
    });

    ipc.on('addNote', (event,arg) => {
        console.log("IPC: addNote event")
        console.log(arg["word"])
        console.log(arg["definitions"])
        console.log(arg["sentence"])
        // arg should be dict with word, definition, sentence fields
        initializeAnkiDeck()
        initializeAnkiModel()
        addAnkiNote(arg["word"], arg["definitions"], arg["sentence"])
    })
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then( () => {
    createWindow()
    // create anki deck if not exist
    initializeAnkiDeck()
    initializeAnkiModel()
    // create anki model if not exist

    }
);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
