const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employeeDB',
});
class EmployeeData {

  constructor() {
    connection.connect((err) => {
      if (err) throw err;
    });
  }

  /**
   * Display List of employees
   */
  getAllEmployees(callback) {
    let empId = [];
    let empName = [];
    const query =
      'SELECT e.id, e.last_name,e.first_name,r.title, d.name as department, r.salary,   m.name as manager FROM employee e' +
      ' INNER JOIN role r ON r.id = e.role_id' +
      ' INNER JOIN manager m ON m.id = e.manager_id' +
      ' INNER JOIN department d ON d.id = r.department_id';
    connection.query(query, (err, res) => {
      console.log(
        `\n id \t first_name \t  last_name \t title \t\t department \t salary \t manager \n`
      );
      console.log(
        `----------------------------------------------------------------------------------------------`
      );
      let i =0;
      res.forEach(({ id, last_name, first_name, title, department, salary, manager }) => {
        empId[i] = first_name + ' '+last_name;
        empName[i] = {id:id,name:first_name + ' '+last_name};
        i++;
        console.log(
          `\n ${id} \t ${last_name} \t\t  ${first_name} \t \t${title} \t ${department} \t \t ${salary} \t ${manager} \n`
        );
      });
      if(callback){
        callback(empId,empName);
      }
      
    });

  }
  /**
   * Display list of employees by department
   * @param {*} department 
   */
  getEmployeesByDepartment(department) {
    const query =
      'SELECT e.id, e.last_name,e.first_name,r.title, d.name as department, r.salary,   m.name as manager FROM employee e' +
      ' INNER JOIN role r ON r.id = e.role_id' +
      ' INNER JOIN manager m ON m.id = e.manager_id' +
      ' INNER JOIN department d ON d.id = r.department_id where d.name = ?';
    connection.query(query, [department.action], (err, res) => {
      console.log(
        `\n id \t first_name \t  last_name \t title \t\t department \t salary \t manager \n`
      );
      console.log(
        `----------------------------------------------------------------------------------------------`
      );
      res.forEach(({ id, last_name, first_name, title, department, salary, manager }) => {
        console.log(
          `\n ${id} \t ${last_name} \t\t  ${first_name} \t \t${title} \t ${department} \t \t ${salary} \t ${manager} \n`
        );
      });
    });

  }

  /**
   * Get department list
   * @param {*} callback 
   */
  getDepartment(callback) {
    let department = [];
    const query =
      'SELECT id,name from department';
    department = connection.query(query, (err, res) => {
      let i = 0;
      let dept = [];
      let deptName = [];
      res.forEach(({ id,name }) => {
        dept[i] = name;
        deptName[i] = {id:id,name:name};
        i++;
      });
      callback(dept,deptName);
    });
  }
  /**
   * Get Role List
   * @param {*} callback 
   */
  getRole(callback) {
    let role = [];
    let roleName = [];
    const query =
      'SELECT id,title from role';
    connection.query(query, (err, res) => {
      let i = 0;
      res.forEach(({ id, title }) => {
        role[i] = title;
        roleName[i] = {id:id,name:title};
        i++;
      });
      callback(role,roleName);
    });
  }

  /**
   * get manager list
   * @param {*} callback 
   */
  getManager(callback) {
    let manager = [];
    let managerName = [];
    const query =
      'SELECT id,name from manager';
    connection.query(query, (err, res) => {
      let i = 0;
      res.forEach(({ id, name }) => {
        manager[i] = name;
        managerName[i] = {id:id,name:name};
        i++;
      });
      callback(manager,managerName);
    });
  }
  /**
   * Get Employees by Manager
   * @param {*} manager 
   */
  getEmployeesByManager(manager,callback) {
    const query =
      'SELECT e.id, e.last_name,e.first_name,r.title, d.name as department, r.salary,   m.name as manager FROM employee e' +
      ' INNER JOIN role r ON r.id = e.role_id' +
      ' INNER JOIN manager m ON m.id = e.manager_id' +
      ' INNER JOIN department d ON d.id = r.department_id where m.name = ?';
    connection.query(query, [manager.action], (err, res) => {
      console.log(
        `\n id \t first_name \t  last_name \t title \t\t department \t salary \t manager \n`
      );
      console.log(
        `----------------------------------------------------------------------------------------------`
      );
      res.forEach(({ id, last_name, first_name, title, department, salary, manager }) => {
        console.log(
          `\n ${id} \t ${last_name} \t\t  ${first_name} \t \t${title} \t ${department} \t \t ${salary} \t ${manager} \n`
        );
      });
    });
  }
  /**
   * add employee to the list
   * @param {*} employee 
   */
  addEmployee(employee) {
    const query = connection.query(
      'INSERT INTO employee SET ?',
      {
        last_name: employee.lastName,
        first_name: employee.firstName,
        role_id: employee.role,
        manager_id: employee.manager
      },
      (err, res) => {
        if (err) throw err;
      }
    );

  }
  deleteEmployee(employee){
    var sql = "DELETE FROM employee WHERE id = ?";
    connection.query(sql,[employee.id], function (err, result) {
      if (err) throw err;
    });
  }
  
endConnection(){
  connection.end();
}

}



module.exports = new EmployeeData;
