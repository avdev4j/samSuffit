const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;

const serverFiles = {
    serverResource: [
        {
            path: SERVER_MAIN_RES_DIR,
            templates: [{ file: 'banner.txt', method: 'copy', noEjs: true }]
        }
    ]
};

function writeFiles() {
    return {
        writeSamFiles() {
            this.writeFilesToDisk(serverFiles, this, false);
        },
        modifyFiles() {}
    };
}

module.exports = {
    writeFiles
};
