INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Business Integrations");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 10000, 1),
       ("Sales Lead", 15000, 1),
       ("Sales Representative", 30000, 1),
       ("Accounting Manager", 70000, 2),
       ("Accounting Lead", 85000, 2),
       ("Accounting Representative", 35000, 2),
       ("HR Manager", 65000, 3),
       ("HR Lead", 77000, 3),
       ("HR Representative", 32000, 3),
       ("BI Manager", 95000, 4),
       ("Systems Administrator", 92000, 4),
       ("Application Administrator", 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Larry", "Bowman", 1, NULL),
       ("Laura", "Jones", 2, 1),
       ("Jason", "Beck", 3, 1),
       ("Nathan", "Childs", 4, NULL),
       ("Melissa", "Schubert", 5, 4),
       ("Kristen", "Smith", 6, 4),
       ("David", "Decker", 7, NULL),
       ("Lydia", "Oliver", 8, 7),
       ("Suzy", "Epperson", 9, 7),
       ("Dan", "Potter", 10, NULL),
       ("Henery", "Cummings", 11, 10),
       ("Mark", "Holler", 12, 10);
