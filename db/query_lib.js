const dataBase = require('../db/connection');

class DBQuery {
    constructor() {
        this.db = dataBase;
    }

    addDept(data) {
        const values = [data.name];
        return this.db
            .promise()
            .query(
                `INSERT INTO department (department_name) VALUES(?)`,
                values
            );
    }

    addRole(data) {
        const values = [data.title, data.salary, data.department_id];
        return this.db
            .promise()
            .query(
                `INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`,
                values
            );
    }

    addEmp(data) {
        const values = [data.first, data.last, data.role_id, data.manager_id];
        return this.db
            .promise()
            .query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
                values
            );
    }

    deleteEmp(data) {
        const values = [data.emp_id];
        return this.db
            .promise()
            .query(
                `DELETE FROM employee WHERE id = ?`,
                values
            );
    }

    updateEmpRoleByID(data) {
        const values = [data.role_id, data.emp_id];
        return this.db
            .promise()
            .query(
                `UPDATE employee SET role_id = ? WHERE id = ?`,
                values
            );
    }

    updateEmpManagerById(data) {
        const values = [data.manager_id, data.emp_id];
        return this.db
            .promise()
            .query(
                `UPDATE employee SET manager_id = ? WHERE id = ?`,
                values
            );
    }

    getDept() {
        return this.db
            .promise()
            .query(
                `SELECT * FROM department`
            )
            .then(([rows]) => rows)
            .catch((err) => {
                console.error('Error retrieving departments: ', err);
                return [];
            });
    }

    getEmpByDeptId(data) {
        const values = [data.dept_id];
        return this.db
            .promise()
            .query(
                `SELECT e.first_name AS "First Name", e.last_name AS "Last Name", d.department_name AS Department FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id WHERE d.id = ?`,
                values
            );
    }

    getEmpByMgrId(data) {
        const values = [data.manager_id];
        return this.db
            .promise()
            .query(
                `SELECT e.first_name AS "First Name", e.last_name AS "Last Name", CONCAT(mgmt.first_name, ' ', mgmt.last_name) AS Manager FROM employee e INNER JOIN employee mgmt ON e.manager_id = mgmt.id WHERE e.manager_id = ?`,
                values
            );
    }

    getBudgetByDept(data) {
        return this.db
            .promise()
            .query(
                `SELECT d.department_name AS Department, SUM(r.salary) AS Budget FROM role r INNER JOIN department d ON r.department_id = d.id GROUP BY department_name`
            );
    }

    getRole(data) {
        return this.db
            .promise()
            .query(
                `SELECT * FROM role`
            );
    }

    getEmp() {
        return this.db
            .promise()
            .query(
                `SELECT e.id as 'Employee_ID', e.first_name, e.last_name FROM employee e`
            );
    }
}

module.exports = DBQuery;
