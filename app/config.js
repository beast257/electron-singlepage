let config = require('./defaults');

const fs = require('fs');
const path = require('path');
const configName = 'electron-config';
let configPrefix;
let configMixIn;

for (configPrefix of ['..', '../..']) {
    let configFilePath = path.join(configPrefix, configName);
    try{
        configMixIn = require(configFilePath);
        break;
    } catch (e) {
        // pass
    }
}

if (typeof configMixIn != 'undefined') {
    const deepMixIn = require('mout/object/deepMixIn');
    deepMixIn(config, configMixIn);
    // ensure relative file path is updated
    if (config.firstLoad.isFile && config.firstLoad.isRelative) {
        config.firstLoad.path = path.join(configPrefix, config.firstLoad.path);
    }
    // disable development tools if development not enabled
    const mHas = require('mout/object/has');
    const mSet = require('mout/object/set');
    if (!config.development.enabled && !mHas(config, 'window.webPreferences.devTools')) {
        mSet(config, 'window.webPreferences.devTools', false);
    }
}

module.exports = config;
