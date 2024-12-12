const fs = require('fs');
const path = require('path');

const directory = __dirname;

function exportModule(file) {
    if (!file.endsWith('.js') || file === 'index.js') {
        return;
    }
    const moduleName = path.basename(file, '.js');
    module.exports[moduleName] = require(path.join(directory, file));
}

fs.readdirSync(directory).forEach(exportModule);
