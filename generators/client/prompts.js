const chalk = require('chalk');

module.exports = {
    askForTheme
};

function askForTheme() {
    if (this.existingProject) return;

    const done = this.async();

    const choices = [
        {
            value: 'red',
            name: 'Magnifik Red'
        },
        {
            value: 'black',
            name: 'Default black'
        }
    ];

    const prompts = [
        {
            type: 'list',
            name: 'theme',
            message: response => this.getNumberedQuestion(`Which ${chalk.yellow('*theme*')} would you want to use?`, true),
            choices,
            default: 'red'
        }
    ];
    this.prompt(prompts).then(props => {
        this.theme = props.theme;
        done();
    });
}
