INSERT INTO departments (name)
VALUES ("Human Resources"),
       ("Finance"),
       ("Legal"),
       ("IT"),
       ("Marketing");

INSERT INTO roles (title, department_id, salary)
VALUES ("Talent Management", 1, 115000),
       ("Manager", 4, 110000),
       ("Executive Assistant", 3, 75000),
       ("Data Analyst", 4, 90000),
       ("Accountant", 2, 225000),
       ("Trainer", 5, 125000),
       ("Attorney", 3, 350000);

INSERT INTO employees (first_name, last_name, manager, role_id)
VALUES ("Erin", "Creet", NULL, 11),
       ("Zeke", "Jones", 1, 42),
       ("James", "Kreeger", NULL, 23),
       ("Ayalah", "Ora", 2, 4),
       ("Tom", "Arro", 2, 55),
       ("Jonny", "Fredrickson",NULL, 76),
       ("Sean", "Higgs", 3, 77);