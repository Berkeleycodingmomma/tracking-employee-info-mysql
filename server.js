const inquirer = require('inquirer');
const cTable = require('console.table');
const SQL = require('./db/query_lib');
const cHelper = require('./lib/choiceHelper');
const sql = new SQL();

// Add a department
const newDept = async () => {
  const department = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the Department?",
      validate: (name) => {
        if (name) {
          return true;
        } else {
          console.log("Please enter a Department Name!");
          return false;
        }
      },
    }
  ]);

  await sql.addDept(department);
  chooseRequest();
};

// Add an employee
const newEmp = async () => {
  const roleArr = await cHelper.roleChoices();
  const mgmtArr = await cHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "input",
      name: "first",
      message: "What is the Employee's First Name?",
      validate: (first) => {
        if (first && isNaN(first)) {
          return true;
        } else {
          console.log("Please enter a valid Name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "last",
      message: "What is the Employee's Last Name?",
      validate: (last) => {
        if (last && isNaN(last)) {
          return true;
        } else {
          console.log("Please enter a valid Name!");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the Employee's Role?",
      choices: roleArr,
      loop: false,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the Employee's Manager?",
      choices: mgmtArr,
      loop: false,
    }
  ]);

  await sql.addEmp(emp);
  chooseRequest();
};

// Add a role
const newRole = async () => {
  const choicesArr = await cHelper.deptChoices();

  const role = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the name of the Role?",
      validate: (title) => {
        if (title) {
          return true;
        } else {
          console.log("Please enter a Role Name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "salary",
      message: "What is the Salary of the Role?",
      validate: (salary) => {
        if (salary && !isNaN(salary)) {
          return true;
        } else {
          console.log("Please enter a valid Role Salary!");
          return false;
        }
      }
    },
    {
      type: "list",
      name: "department_id",
      message: "What Department is the Role associated with?",
      choices: choicesArr,
      loop: false,
    }
  ]);

  await sql.addRole(role);
  chooseRequest();
};

// Delete an employee
const delEmp = async () => {
  const empArr = await cHelper.NonMgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "Which Employee do you want to Delete?",
      choices: empArr,
      loop: false,
    }
  ]);

  await sql.deleteEmp(emp);
  chooseRequest();
};