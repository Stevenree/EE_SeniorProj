const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const fs = require('fs');
const ipc = ipcMain;
const dialog = require('electron').dialog;
const sizeOf = require('image-size')

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
            if (dir === undefined) return
            let dirPath = dir.filePaths[0];
            let pages = [];
            
            fs.readdirSync(dirPath).forEach( (file) => {
                let absFilePath = path.join(dirPath, file);
                let fileBase64 = fs.readFileSync(absFilePath, 'base64')
                // console.log( fileBase64.toString() )
                const dimensions = sizeOf( Buffer.from(fileBase64, 'base64') );
                
                // TO-DO
                // Prepare the list of json objects to send over.
                const page = {}
                page["base64"] = fileBase64
                page["width"] = dimensions.width
                page["height"] = dimensions.height
                pages.push(page);

            });
            event.sender.send('nested-images-base64', pages);
        })
    });
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

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
