const inquirer = require('inquirer');
const cTable = require('console.table');
const sql = require('./db/query_lib');
const cHelper = require('./lib/choiceHelper');

//Adding Depatments

const newDept = async () => {
    const department = await inquirer.createPromptModule([{
            tupe: 'input',
            name: 'name',
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
        },
        {
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
            type: 'list',
            name: 'department_id',
            message: 'What Department is the Role associated with?',
            choices: choiceArr,
            loop: false,
        }
    ]);
    await sql.addRole(role);
    chooseRequest();
}

//Deleting employee for the BONUS!!!!!!

const delEmp = async () => {
    const empArr = await cHelper.NonMgmtChoices();
    const emp = await inquirer.prompt([{
        type: 'list',
        name: 'emp_id',
        message: 'What Employee do you want to delete?',
        choices: empArr,
        loop: false,
    }]);
    await sql.deleteEmp(emp);
    choiceRequest();
}

//Below is the funtion to update employee's role

const updateEmpRole = async () => {
    const roleArr = await cHelper.roleChoices();
    const empArr = await cHelper.empChoices();
    const emp = await inquirer.prompt([{
            type: 'list',
            name: 'emp_id',
            message: 'What is the Employee that you want to update?',
            choices: empArr,
            loop: false,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'What is the Employees Role?',
            choices: roleArr,
            loop: false,
        }
    ]);
    await sql.updateEmpRoleById(emp);
    chooseRequest();
}

//Below is updating the employee's manager for the BONUS!!!!!
const updateEmpManager = async () => {
    const empArr = await cHelper.NonMgmtChoices();
    const mgmtArr = await cHelper.mgmtChoices();
    const emp = await inquirer.prompt([{
            type: 'list',
            name: 'emp_id',
            message: 'What is the Employee that you want to update?',
            choices: empArr,
            loop: false,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the Employees Manager?',
            choices: mgmtArr,
            loop: false,
        }
    ]);
    await sql.updateEmpManagerById(emp);
    choiceRequest;
}

//Function to view all Departments

const viewDepts = () => {
    sql.getDepts()

        .then(([rows]) => {
            console.log('\n');
            console.log(cTable.getTable(rows));
        })
        .then(() => {
            choiceRequest();
        })
}

//Function to view all Roles

const viewRoles = () => {
    sql.getRoles()

        .then(([rows]) => {
            console.log('\n');
            console.log(cTable.getTable(rows));
        })
        .then(() => {
            choiceRequest();
        })
}

//Function to view all employee's

const viewEmps = () => {
    sql.getEmps()

        .then(([rows]) => {
            console.log('\n');
            console.log(cTable.getTable(rows));
        })
        .then(() => {
            choiceRequest();
        })
}

//Functions to view all departments and their budgets for the BONUS!

const viewBudgets = async () => {
    sql.getBudgetByDept()
        .then(([rows]) => {
            console.log('.\n');
            console.log(cTable.getTable(rows));
        })
}

//functions to view all employee's in a certain department for the BONUS!

const viewEmpByIdDept = async () => {
    const deptArr = await cHelper.deptChoices();
    inquirer.prompt([{
            type: 'list',
            name: 'dept_id',
            message: 'What Department do you want to view employees for?',
            choices: deptArr,
            loop: false
        }])
        .then((data) => {
            sql.getEmpByDeptId(data)
                .then(([rows]) => {
                    console.log('\n');
                    console.log(cTable.getTable(rows))
                    choiceRequest();
                })
        })
}


//functions to view all employee's who report to certain managers for the BONUS!

const viewEmpByMgr = async () => {
    const mgmtArr = await cHelper.mgmtChoices();
    inquirer.prompt([{
            type: 'list',
            name: 'manager_id',
            message: 'Which Manager do you want to view employees for?',
            choices: mgmtArr,
            loop: false
        }])
        .then((data) => {
            sql.getEmpByMgrId(data)
                .then(([rows]) => {
                    console.log('\n');
                    console.log(cTable.getTable(rows))
                    choiceRequest();
                })
        })
}

//Below I have added the prompt questions

const chooseRequest = () => {
    inquirer.prompt([{
            type: 'list',
            name: 'request',
            message: 'What would you like to do?',
            choices: ['Add a Department',
                'Add an Employee',
                'Add a Role',
                'Delete and Employee',
                'Update Employees Role',
                'Update Employees Manager',
                'View All Departments',
                'View All Employess',
                'View All Roles',
                'View Department Budget',
                'View Employees by Department',
                'View Employees by Manager',
            ],
            loop: false
        }, ])
        .then((data) => {
            const {
                request
            } = data;
            console.log(request);

            // Switch Case
            switch (request) {
                case 'Add a Department':
                    newDept();
                    break;
                case 'Add a Role':
                    newRole();
                    break;
                case 'Add an Employee':
                    newEmp();
                    break;
                case 'Delete an Employee':
                    delEmp();
                    break;
                case 'Update Employees Role':
                    updateEmpRole();
                    break;
                case 'Update Employees Manager':
                    updateEmpManager();
                    break;
                case 'View all Departments':
                    viewDepts();
                    break;
                case 'View all Employees':
                    newEmp();
                    break;
                case 'View all Roles':
                    viewRoles();
                    break;
                case 'VIew Department Budget':
                    viewBudgets();
                    break;
                case 'View Employees by Department':
                    viewEmpByIdDept();
                    break;
                case 'View Employees by Manager':
                    viewEmpByMgr();
                    break;

                default:
                    break;
            }
        })
}

chooseRequest();