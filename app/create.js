const electron = require('electron');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
//  be closed automatically when the JavaScript object is garbage collected.
let main;

function create() {
    // Create the browser window.
    main = new BrowserWindow({
        width: 800,
        height: 600
    });

    // Load the index.html of the app.
    main.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    //main.webContents.openDevTools();

    // Add a listener for the window being closed.
    main.on('closed', function() {
        // Dereference the window object.
        main = null;
    });
}

module.exports = {
    create: create
};

// update `exports.main` dynamically
Object.defineProperty(module.exports, 'main', {
    get() { return main; },
    enumerable: true
});
