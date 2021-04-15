// array of questions for user
const inquirer = require("inquirer");
const inquirer = require("./lib/connection");
const questions = [
    

    {
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["View All Employees", "View Employees By Department"
        , "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Manager Role"]
    }
];

 const runSearch = () => {
        inquirer
          .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: ["View All Employees", "View Employees By Department"
            , "View Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Manager Role"
            ],
          })
          .then((answer) => {
            switch (answer.action) {
              case 'Find songs by artist':
                artistSearch();
                break;
      
              case 'Find all artists who appear more than once':
                multiSearch();
                break;
      
              case 'Find data within a specific range':
                rangeSearch();
                break;
      
              case 'Search for a specific song':
                songSearch();
                break;
      
              case 'Exit':
                connection.end();
                break;
      
              default:
                console.log(`Invalid action: ${answer.action}`);
                break;
            }
          });
      };

// function call to initialize program
runSearch();
