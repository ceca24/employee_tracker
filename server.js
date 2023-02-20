// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
// ctable for displaying data in a table format
const cTable = require("console.table");
const dotenv = require("dotenv");

// dotenv config for .env file
dotenv.config();

// create connection to mysql database
const db = mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// connect to mysql database
db.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
    // start the app
    startApp();
});

// startApp function
const start = () => {
    // prompt user for what they would like to do
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "View All Roles",
                "Add Role",
                "Remove Role",
                "View All Departments",
                "Add Department",
                "Remove Department",
                "Exit",
            ],
        })
        .then((answer) => {
            // Switch statement to handle user input
            if (answer.start === "View All Employees") {
                viewAllEmployees();
            } else if (answer.start === "View All Employees By Department") {
                viewAllEmployeesByDepartment();
            } else if (answer.start === "View All Employees By Manager") {
                viewAllEmployeesByManager();
            } else if (answer.start === "Add Employee") {
                addEmployee();
            } else if (answer.start === "Remove Employee") {
                removeEmployee();
            } else if (answer.start === "Update Employee Role") {
                updateEmployeeRole();
            } else if (answer.start === "Update Employee Manager") {
                updateEmployeeManager();
            } else if (answer.start === "View All Roles") {
                viewAllRoles();
            } else if (answer.start === "Add Role") {
                addRole();
            } else if (answer.start === "Remove Role") {
                removeRole();
            } else if (answer.start === "View All Departments") {
                viewAllDepartments();
            } else if (answer.start === "Add Department") {
                addDepartment();
            } else if (answer.start === "Remove Department") {
                removeDepartment();
            } else {
                db.end();
            }
        })};