const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const yargs = require('yargs');

const options = yargs
    .usage('Usage: -p <path to the dir>')
    .option('p', {
        alias: 'path',
        describe: 'Path to the dir',
        type: 'string',
        demandOption: false,
        default: process.cwd(),
    })
    .option('s', {
        alias: 'String',
        describe: 'string',
        type: 'string',
        demandOption: false,
    }).argv;

const start = (Directory) => {
    const fileList = fs.readdirSync(Directory);

    inquirer.prompt([{
        name: 'fileName',
        type: 'list',
        message: `Текущая директория ${Directory}`,
        choices: fileList,
    }]).then(({ fileName }) => {
        const fullPath = path.join(Directory, fileName);
        if (fs.lstatSync(fullPath).isFile()) {
            const data = fs.readFileSync(fullPath, 'utf-8');
            options.s !== undefined ? console.log(data.match(new RegExp(options.s, 'img'))) : console.log(data);
        } else {
            start(fullPath);
        }
    });
}
start(options.path);