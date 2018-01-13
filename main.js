const electron = require('electron');
// Module to control application life.
const app = electron.app;

const createWindow = require('./app/create.js').create;

// This method will be called when Electron has finished
//  initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});
