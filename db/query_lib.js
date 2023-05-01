const db = require('./connection');

class DBQuery {
    constructor(db) {
        this.db = db;
    }
    addDept(data) {
        const values = [data.name];
        return this.db
            .promise()
            .query(
                `INSERT INTO department department_name) VALUES(?)`,
                values
            );
    }

    addRole(data) {
        const values = [data.title, data.salary, data.department_id];
        return this.db
            .promise()
            .query(
                `INSERT INTO role
                (title, salary, department_id)
                VALUES(?,?,?)`,
                values
            );
    }
    addEmp(data) {
        const values = [data.first, data.last, data.role_id, data.manager_id];
        return this.db
            .promise()
            .query(
                `INSERT INTO employee
                (first_name, last_name, manager_id) 
                VALUES(?,?,?,?)`,
                values
            );
    }
    deleteEmp(data) {
        const values = [data.emp_id];
        return this.db
            .promise()
            .query(
                `DELETE FROM employee
                WHERE id = ?`,
                values
            );
    }
    updateEmpRoleByID(data) {
        const values = [data.role_id, data.emp_id];
        return this.db
            .promise()
            .query(
                `UPDATE employee
                SET role_id = ?
                WHERE id = ?`,
                values
            );
    }
    updateEmpManagerById(data) {
        const values = [data.manager_id, data.emp_id];
        return this.db
            .promise()
            .query(
                `UPDATE employee
                SET manager_id = ?
                WHERE id = ?`,
                values
            );
    }
    getDepts() {
        return this.db
            .promise()
            .query(
                `SELECT *
                FROM department`,
            );
    }