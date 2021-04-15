const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Piu@1243',
  database: 'employeeDB',
});
class Connection {

  constructor() {
    this.connect = connection.connect((err) => {
      if (err) throw err;
      runSearch();
    });
  }

  getAllEmployees() {
    const query =
      'SELECT e.id, e.last_name,e.first_name,r.title, d.department, r.salary,   e.manager FROM employee e' +
      ' INNER JOIN role r ON r.id = e.role_id' +
      ' INNER JOIN department d ON d.id = r.department_id';
    connection.query(query, (err, res) => {
      res.forEach(({ id, last_name, first_name, title, department, salary, manager }) => {
        console.log(
          ` ${id} ${last_name}  ${first_name} ${title} ${department} ${salary} ${manager} \n`
        );
      });
    });

  }
  getEmployeesByDepartment(department) {
    const query =
      'SELECT e.id, e.last_name,e.first_name,r.title, d.department, r.salary,   e.manager FROM employee e' +
      ' INNER JOIN role r ON r.id = e.role_id' +
      ' INNER JOIN department d ON d.id = r.department_id where d.name = ?';
    connection.query(query, [department], (err, res) => {
      res.forEach(({ id, last_name, first_name, title, department, salary, manager }) => {
        console.log(
          ` ${id} ${last_name}  ${first_name} ${title} ${department} ${salary} ${manager} \n`
        );
      });
    });

  }
  getDepartment() {
    let department = [];
    const query =
      'SELECT id,name from department';
    connection.query(query, (err, res) => {
      let i = 0;
      res.forEach(({ id, name }) => {
        department[i++] = { id: id, name: name };
      });
    });
    return department;
  }
  getRole() {
    let role = [];
    const query =
      'SELECT id,name from role';
    connection.query(query,  (err, res) => {
      let i = 0;
      res.forEach(({ id, name }) => {
        role[i++] = { id: id, name: name };
      });
    });
    return role;
  }
  getManager() {
    let manager = [];
    const query =
      'SELECT id,name from manager';
    connection.query(query,  (err, res) => {
      let i = 0;
      res.forEach(({ id, name }) => {
        manager[i++] = { id: id, name: name };
      });
    });
    return manager;
  }
  getEmployeesByManager(manager) {
    const query =
      'SELECT e.id, e.last_name,e.first_name,r.title, d.department, r.salary,   e.manager FROM employee e' +
      ' INNER JOIN role r ON r.id = e.role_id' +
      ' INNER JOIN department d ON d.id = r.department_id where e.manager_id = ?';
    connection.query(query, [manager], (err, res) => {
      res.forEach(({ id, last_name, first_name, title, department, salary, manager }) => {
        console.log(
          ` ${id} ${last_name}  ${first_name} ${title} ${department} ${salary} ${manager} \n`
        );
      });
    });
  }
  addEmployee(employee) {
    const query = connection.query(
      'INSERT INTO employee SET ?',
     { last_name:employee.lastName, 
      first_name: employee.firstName,
      title: employee.title,
      department: employee.department, 
      salary: employee.salary,
      manager: employee.manager },
      (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} product inserted!\n`);
        // Call updateProduct AFTER the INSERT completes
        updateProduct();
      }
    );
  
  
  }


}



exports = new Connection;
