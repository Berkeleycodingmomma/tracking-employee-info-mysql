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

    chooseRequest();
}

//Adding Employees
const newEmp = async () => {
    const roleArr = await cHelper.roleChoice();
    const mgmtArr = await cHelper.mgmtChoices();
    const emp = await inquirer.createPromptModule([{
            type: 'input',
            name: 'first',
            message: 'What is the Employees first name?',
            validate: (first) => {
                if (first && isNan(first)) {
                    return true;
                } else {
                    console.log('Please enter a name')
                    return false;
                }
            },

        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the Employees last name?',
            validate: (first) => {
                if (first && isNan(last)) {
                    return true;
                } else {
                    console.log('Please enter a name')
                    return false;
                }
            },
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the Employees Role?',
            choices: mgmtArr,
            loop: false,
        } {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the Employees Manager?',
            choices: mgmtArr,
            loop: false,
        }
    ]);
    await sql.addEmp(emp);
    choiceRequest();
}

//Adding the roles
const newRole = async () => {
    const choicesArr = await inquirer.createPromptModule([{
            type: 'input',
            name: 'title',
            message: 'What is the name of the Role?',
            validate: (title) => {
                if (title) {
                    return true;

                } else {
                    console.log('Please enter a Role name.')
                    return false;
                }
            },
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the Salary of the Role?',
            validate: (salary) => {
                if (salary && !isNan(salary)) {
                    return true;

                } else {
                    console.log('Please enter a Role Salary');
                }
            }
        }, {
            type: 'list'
            name: 'department_id',
            message: 'What Department is the Role associated with?',
            choices: choiceArr,
            loop: false,
        }
    ]);
    await sql.addRole(role);
    chooseRequest();
}