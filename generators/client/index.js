/* eslint-disable consistent-return */
const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster/generators/client');
const writeAngularFiles = require('./files-angular').writeFiles;
const prompts = require('./prompts');

module.exports = class extends ClientGenerator {
    constructor(args, opts) {
        super(args, Object.assign({ fromBlueprint: true }, opts)); // fromBlueprint variable is important

        const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

        if (!jhContext) {
            this.error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprint samSuffit')}`);
        }

        this.configOptions = jhContext.configOptions || {};
        // This sets up options for this sub generator and is being reused from JHipster
        jhContext.setupClientOptions(this, jhContext);

        this.delete = this._delete;
    }

    get initializing() {
        const phaseFromJHipster = super._initializing();
        const phaseFromSam = {
            setupSamconsts() {
                const configuration = this.getAllJhipsterConfig(this, true);
                this.theme = configuration.get('theme') || this.configOptions.theme;
            }
        };

        return { ...phaseFromJHipster, ...phaseFromSam };
    }

    get prompting() {
        const phaseFromJHipster = super._prompting();
        const phaseFromSam = {
            askForTheme: prompts.askForTheme,
            setSamSharedConfigOptions() {
                this.configOptions.theme = this.theme;
            }
        };

        return { ...phaseFromJHipster, ...phaseFromSam };
    }

    get configuring() {
        const phaseFromJHipster = super._configuring();
        const phaseFromSam = {
            saveSamConfig() {
                const config = {
                    theme: this.theme
                };
                this.config.set(config);
            }
        };

        return { ...phaseFromJHipster, ...phaseFromSam };
    }

    get default() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._default();
    }

    get writing() {
        const phaseFromJHipster = super._writing();
        /* eslint-disable */
        const phaseFromSam = {
            writeSamFiles() {
                if (this.clientFramework === 'angularX') {
                    return writeAngularFiles.call(this);
                }
            }
        };
        /* eslint-enable */

        return { ...phaseFromJHipster, ...phaseFromSam };
    }

    get install() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._install();
    }

    get end() {
        // Here we are not overriding this phase and hence its being handled by JHipster
        return super._end();
    }

    _delete(templatePathFrom, templatePathTo) {
        this.fs.delete(templatePathTo);
    }
};
