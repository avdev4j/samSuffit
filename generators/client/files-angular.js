const constants = require('generator-jhipster/generators/generator-constants');

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
                { file: 'content/images/logo-daily.png', method: 'copy' },
                { file: 'content/images/logo-jhipster.png', method: 'delete' }
            ]
        }
    ]
};

function writeFiles() {
    this.writeFilesToDisk(clientFiles, this, false, 'angular');
    this.addMainSCSSStyle("@import 'daily';", 'add daily bug scss');
    changeJhipsterLogoToDailyLogo.call(this);
}

function changeJhipsterLogoToDailyLogo() {
    this.replaceContent(
        `${ANGULAR_DIR}layouts/navbar/navbar.scss`,
        "'../../../content/images/logo-jhipster.png'",
        "'../../../content/images/logo-daily.png'"
    );
}

module.exports = {
    writeFiles
};
