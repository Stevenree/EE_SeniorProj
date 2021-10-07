// Globally defines our ipcRenderer s.t it can be used in rendering components (react)

interface Window {
    ipcRenderer: any;
}

window.ipcRenderer = require('electron').ipcRenderer;