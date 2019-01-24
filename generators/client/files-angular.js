const constants = require('generator-jhipster/generators/generator-constants');
const jhipsterUtils = require('generator-jhipster/generators/utils');

const MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const ANGULAR_DIR = constants.ANGULAR_DIR;

const clientFiles = {
    angularMain: [
        {
            path: ANGULAR_DIR,
            templates: [
                { file: 'home/home.component.html', method: 'processHtml' },
                { file: 'layouts/footer/footer.component.html', method: 'processHtml' }
            ]
        }
    ],
    sass: [
        {
            condition: generator => generator.useSass,
            path: MAIN_SRC_DIR,
            templates: ['content/scss/daily.scss']
        }
    ],
    image: [
        {
            path: MAIN_SRC_DIR,
            templates: [
                { file: 'content/images/daily-bugle.png', method: 'copy' },
                { file: 'content/images/logo-jhipster.png', method: 'copy' }
            ]
        }
    ]
};

function writeFiles() {
    this.writeFilesToDisk(clientFiles, this, false, 'angular');
    addGlobalSCSSStyle.call(this, "@import 'daily';");
}

/**
 * TODO remove this when https://github.com/jhipster/generator-jhipster/pull/9078 will be merge.
 */
function addGlobalSCSSStyle(style, comment) {
    const fullPath = `${MAIN_SRC_DIR}content/scss/global.scss`;
    let styleBlock = '';
    if (comment) {
        styleBlock += '/* ==========================================================================\n';
        styleBlock += `${comment}\n`;
        styleBlock += '========================================================================== */\n';
    }
    styleBlock += `${style}\n`;
    try {
        jhipsterUtils.rewriteFile(
            {
                file: fullPath,
                needle: 'jhipster-needle-scss-add-main',
                splicable: [styleBlock]
            },
            this
        );
    } catch (e) {
        this.debug('Error:', e);
    }
}

module.exports = {
    writeFiles
};
