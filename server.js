const inquirer = require('inquirer');
const cTable = require('console.table');
const sql = require('./db/query_lib');
const cHelper = require('./lib/choiceHelper');

//Adding Depatments

const newDept = async () => {
    const department = await inquirer.createPromptModule([{
            tupe: 'input',
            name: 'name';
            message: 'What is the name of the Department?',
            validate: (name) => {
                if (name) {
                    return true;

                } else {
                    console.log('Please enter a Department name')
                    return false;
                }
            },
        },

    ]);
    await sql.addDept(department);
}

