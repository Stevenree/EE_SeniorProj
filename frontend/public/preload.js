// @ts-nocheck
// Globally defines our ipcRenderer s.t it can be used in rendering components (react)
window.remote = require('electron').remote;
window.electron = require('electron')
window.fs = require('fs');
window.path = require('path');
window.ipcRenderer = require('electron').ipcRenderer;