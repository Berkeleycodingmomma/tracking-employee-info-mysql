# tracking-employee-info-mysql
#
# Command-line application, mysql Employee Tracker
#
## Description 
I have built a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.
The user will use the command line process to start the application. The will be presented options to view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role. They will be presented with a formatted table showing department names and id's. The user then can choose to view all roles including job title, role id, the department that role belongs to, and the salary for that role. The user can then choose to view all employees and will be presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to. The user can choose to add a department, choose to add a role, enter the name, salary, and department for the role and that role is added to the database. The the user can add an employee with the first name, last name, role, and manager. At that point the employee is added to the database. They can then update an employee role, select an employee to update, and their new role and this information is updated in the database. 


#
## Visual image of the terminal during the command-line application
#
![Screen Shot 2023-05-01 at 11 41 22 PM](https://user-images.githubusercontent.com/127444682/235587925-e8366614-1f5d-4b69-9b36-e5396a516a01.png)
#
## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
Using the console.table package to print MySQL rows to the console: https://www.npmjs.com/package/console.table
Adding Inquirer: https://www.npmjs.com/package/inquirer
Adding Mysql: https://www.npmjs.com/package/mysql2https://www.w3resource.com/mysql-exercises/insert-into-statement/insert-into-statement-exercise-14.php
Declaration file for module: https://stackoverflow.com/questions/41292559/could-not-find-a-declaration-file-for-module-module-name-path-to-module-nam
#
## Youtube link to a walk-through demonstrating how to crete an employee tracker through the command-line
#

* [Youtube-demo-link](https://youtu.be/Es4mwX9x9Kk)

#

## Code examples of the project

#
--------------------------------------------------------------------------------------------------------------------------------------------------------

 ```sh


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
        },
         ])
        .then((data) => {
            const {
                request
            } = data;
            console.log(request);


```

**(ABOVE)- I added the prompt questions

--------------------------------------------------------------------------------------------------------------------------------------------------------

```sh
    
const updateEmpRole = async () => {

  const roleArr = await cHelper.roleChoices();

  const empArr = await cHelper.empChoices();

  const emp = await inquirer.prompt([{
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the Employees Role?",
      choices: roleArr,
      loop: false,
    }
  ]);

  await sql.updateEmpRoleById(emp);

  chooseRequest();

}
 
```

**(ABOVE)- Update an employees role

--------------------------------------------------------------------------------------------------------------------------------------------------------

```sh


CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,

  PRIMARY KEY (id),
  UNIQUE KEY (department_name)
);
    
```

**(ABOVE)- Creating the Department Name 

--------------------------------------------------------------------------------------------------------------------------------------------------------

```sh
  
const viewEmpByDept = async () => {

  const deptArr = await cHelper.deptChoices();

  inquirer.prompt([{
      type: "list",
      name: "dept_id",
      message: "What is the Department do you want to view Employees for?",
      choices: deptArr,
      loop: false
    }])

    .then((data) => {
      sql.getEmpByDeptId(data)
        .then(([rows]) => {
          console.log('\n');
          console.log(cTable.getTable(rows))
          chooseRequest();
        })
    })

}


```
**(ABOVE)- Viewing All Employees in a specific Department, Bonus Objective

--------------------------------------------------------------------------------------------------------------------------------------------------------

## Author Info

### Amanda Gray

* [Linkedin](https://www.linkedin.com/in/amanda-gray-831a65254/)
* [Github](https://github.com/Berkeleycodingmomma)

## Credits

Shout out to all the TA's and Google Search!

GOOGLE!  Seriously, thank you google search!





© 2023 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.


