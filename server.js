// dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");

// create connection to mysql database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yesidid24@",
    database: "employee_db",
},
console.log ("Welcome to the Employee Tracker!")
);

// connect to mysql database
db.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + db.threadId);
    // start the app
    startMenu();
});

// startMenu function
const startMenu = () => {
    // prompt user for what they would like to do
    inquirer
        .prompt({
            name: "selections",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments.",
                "View all roles.",
                "View all employees.",
                "Add a department.",
                "Add a role.",
                "Add an employee",
                "Update an employee role.",
            ],
        }
  )
 
  .then((response) => {
    console.log(response.selections);
    switch (response.selections) {
      case "View all departments.":
        db.query("SELECT * FROM departments", function (err, results) {
          //View all: Departments, roles, employees, add a department, add a role, add an employee and update their role.
          console.log(results);
          startMenu();
        });
        break;
      case "View all roles.":
        db.query("SELECT * FROM roles", function (err, results) {
          console.log(results);
          startMenu();
        });
        break;
      case "View all employees.":
        db.query("SELECT * FROM employees", function (err, results) {
          console.log(results);
          startMenu();
        });
        break;
      case "Add a department.":
        inquirer
          .prompt([
            {
              type: "input",
              name: "newdepartment",
              message:
                "Please enter the name of the department you would like to add.",
            },
          ])
          .then((results) => {
            db.query("INSERT INTO departments SET ?", {
              //insert into
              name: results.newdepartment,
            });
            startMenu(); //restarting menu
          });

        break;
      case "Add a role.":
        db.query("SELECT * FROM departments", (err, result) => {
          inquirer
            .prompt([
              {
                type: "input",
                name: "newrole",
                message: "Please enter the name of the role.",
              },
              {
                type: "input",
                name: "newsalary",
                message: "Please enter the salary of that role.",
              },
              {
                type: "list",
                name: "newdepartment",
                message: "Please select the department ID for this role.",
                choices: result.map((department) => department.name),
              },
            ])
            .then((results) => {
              const department = result.find(
                (department) => department.name === results.newdepartment
              ); //matching the department name to the id to pass into the db.query.
              db.query(
                "INSERT INTO roles SET ?",
                {
                  title: results.newrole,
                  salary: results.newsalary,
                  department_id: department.id,
                },
                function (err) {
                  if (err) throw err;
                  console.log("Role successfully added.");
                  startMenu();
                }
              );
            });
        });

        break;
      case "Add an employee":
  db.query("SELECT * FROM roles", (err, roles) => {
    db.query("SELECT * FROM employees", (err, employees) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "newfirst_name",
            message: "Please enter the first name of the employee.",
          },
          {
            type: "input",
            name: "newlast_name",
            message: "Please enter the last name of the employee.",
          },
          {
            type: "list",
            name: "newrole_id",
            message: "Please select their role.",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id
            })),
          },
          {
            type: "list",
            name: "newmanager_id",
            message: "Please select their manager.",
            choices: employees.map((employee) => ({
              name: employee.first_name + " " + employee.last_name,
              value: employee.id
            })),
          },
        ])
        .then((results) => {
          db.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              results.newfirst_name,
              results.newlast_name,
              results.newrole_id,
              results.newmanager_id,
            ],
            function (err) {
              if (err) throw err;
              console.log("Employee successfully added.");
              startMenu();
            }
          );
        });
    });
  });
  break;

      case "Update an employee role.":
        db.query("SELECT * FROM employees", (err, result) => {
          inquirer
            .prompt([
              {
                type: "list",
                name: "newemployeename",
                message:
                  "Please select the employee you would like to update",
                choices: result.map(
                  (employee) => employee.first_name + " " + employee.last_name
                ),
              },
            ])
            .then((results) => {
              //Matching employee name to their ID.
              const employeeID = result.find(
                (employee) =>
                  employee.first_name + " " + employee.last_name ===
                  results.newemployeename
              );
              db.query("SELECT * from roles", (err, result) => {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "newrole",
                      message:
                        "Please select the updated role for the employee.",
                      choices: result.map((role) => ({
                        name: role.title,
                        value: role.id,
                      })),
                    },
                  ])
                  .then((results) => {
                    const roleId = result.find(
                      (role) => role.title === results.newrole
                    );
                    db.query(
                      "UPDATE employees SET role_id = ? WHERE id = ?",
                      [results.role_id, employeeID.id]
                    );
                    startMenu();
                  });
              });
            });
        });

        break;
      default:
        console.log("Please make a selection to continue.");
    }
  });
};

startMenu();