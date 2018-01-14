const electron = require('electron');
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const config = require('./config');

// Keep a global reference of the window object, if you don't, the window will
//  be closed automatically when the JavaScript object is garbage collected.
let main;

function create() {
    // Create the browser window.
    var windowSettings = config.window;
    main = new BrowserWindow(windowSettings);

    // Load the initial page of the app.
    var pathSettings = {
        pathname: config.firstLoad.path
    };
    if (config.firstLoad.isFile) {
        pathSettings.protocol = 'file:';
        pathSettings.slashes = true;
        if (config.firstLoad.isRelative) {
            pathSettings.pathname = path.join(__dirname, pathSettings.pathname);
        }
    }
    main.loadURL(url.format(pathSettings));

    // Open the DevTools.
    if (config.development.enabled && config.development.openDevToolsOnLaunch) {
        main.webContents.openDevTools();
    }

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
