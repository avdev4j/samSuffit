const constants = require('generator-jhipster/generators/generator-constants');

const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const JHI_CONFIG_FOLDER_PATH = `${SERVER_MAIN_RES_DIR}config/`;

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
        modifyFiles() {
            addMyPropInApplicationYaml.call(this);
        }
    };
}

function addMyPropInApplicationYaml() {
    this.replaceContent(`${JHI_CONFIG_FOLDER_PATH}application.yml`, '# application:', '# application:\n    # myProp: true');
}

module.exports = {
    writeFiles
};
