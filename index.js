// array of questions for user
const inquirer = require("inquirer");
const employeeDB = require("./lib/employeeDB.js");
const questions = [
    {
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View All Employees", "View Employees By Department"
            , "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Manager Role", "Exit"]
    },
]

function runSearch() {
    inquirer
        .prompt(questions)
        .then(answer => {
            switch (answer.action) {
                case 'View All Employees':
                    employeeDB.getAllEmployees();
                    runSearch();
                    break;

                case 'View Employees By Department':
                    viewByDepartment();

                    break;

                case 'View Employees By Manager':
                    viewEmployeeByManager();
                    break;

                case 'Add Employee':
                    addEmployee();

                    break;
                case 'Remove Employee':
                    employeeDB.getAllEmployees(
                        (empId, empName) => {
                            inquirer
                                .prompt({
                                    name: 'id',
                                    type: 'list',
                                    message: 'Which Employee do you want to delete?',
                                    choices: empId
                                })
                                .then(answer => {
                                    empName.forEach(
                                        ({id,name})=>{
                                            if(name ===answer.id){
                                                answer.id = id;
                                            }
                                        }
                                    );
                                    employeeDB.deleteEmployee(answer);
                                    runSearch();
                                });
                        }
                    );

                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'Update Manager Role':
                    updateManager();
                    break;
                case 'Complete':
                    employeeDB.endConnection();
                    process.exit();
                    break;
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

// function call to initialize program
runSearch();
function viewByDepartment() {
    employeeDB.getDepartment(
        (res, resName) => {
            inquirer
                .prompt({
                    name: 'action',
                    type: 'list',
                    message: 'Choose Department?',
                    choices: res
                })
                .then(answer => {
                    employeeDB.getEmployeesByDepartment(answer);
                    runSearch();
                });
        }
    );
}

function viewEmployeeByManager() {
    employeeDB.getManager(
        (res, resName) => {
            inquirer
                .prompt({
                    name: 'action',
                    type: 'list',
                    message: 'Choose Manager?',
                    choices: res
                })
                .then(answer => {
                    employeeDB.getEmployeesByManager(answer);
                    runSearch();
                });
        }
    );
}

function addEmployee() {
    employeeDB.getManager(
        (manager, managerName) => {
            employeeDB.getRole(
                (role, roleName) => {
                    inquirer
                        .prompt([{
                            type: "input",
                            message: "What is the first name ?",
                            name: "firstName"
                        },

                        {
                            type: "input",
                            message: "What is the last name ?",
                            name: "lastName"
                        },
                        {
                            type: 'list',
                            message: "What is the role ?",
                            name: "role",
                            choices: role
                        },
                        {
                            type: 'list',
                            message: "Who is the Manager ?",
                            name: "manager",
                            choices: manager
                        }])
                        .then(answer => {
                            if (answer.manager) {
                                managerName.forEach(({ id, name }) => {
                                    if (name === answer.manager) {
                                        answer.manager = id;
                                    }
                                });
                            }
                            if (answer.role) {
                                roleName.forEach(({ id, name }) => {
                                    if (name === answer.role) {
                                        answer.role = id;
                                    }
                                });
                            }
                            employeeDB.addEmployee(answer);
                            runSearch();
                        });
                }
            );
        });
}

