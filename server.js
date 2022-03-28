const express = require("express");
const mysql = require("mysql2");
var inquirer = require("inquirer");
const cTable = require("console.table");
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		// Your MySQL username,
		user: "root",
		// Your MySQL password
		password: "C$ocks2016!",
		database: "employee_tracker",
	},
	console.log("Connected to the employee_tracker database.")
);

// beginning message upon npm start
console.log(`
======================
EMPLOYEE TRACKER APP
======================
`);

//start function that asks what the user would like to do
const employeeTrackerStart = () => {
	return inquirer
		.prompt([
			/* Pass your questions in here */
			{
				type: "list",
				name: "initial",
				message: "What would you like to do?",
				choices: [
					"View all Departments",
					"Add Department",
					"View All Roles",
					"Add Role",
					"View all Employees",
					"Add Employee",
					"Update Employee",
				],
			},
		])
		.then((answers) => {
			// switch cases that triggers specific function based on what the user wants to do
			let { initial } = answers;
			switch (initial) {
				case "View all Departments":
					allDepartments();
					break;
				case "Add Department":
					addDepartment();
					break;
				case "View All Roles":
					allRoles();
					break;
				case "Add Role":
					addRole();
					break;
				case "View all Employees":
					allEmployees();
					break;
				case "Add Employee":
					addEmployee();
					break;
				case "Update Employee":
					updateEmployee();
					break;
			}
		})
		.catch((err) => {
			console.log(err);
		});
};

//View all departments
const allDepartments = () => {
	db.query(`SELECT * FROM departments`, (err, rows) => {
		console.table(rows);
		if (err) console.log(err);
		return employeeTrackerStart();
	});
};

//Add a department
const addDepartment = () => {
	return inquirer
		.prompt([
			{
				type: "input",
				name: "add_dept",
				message: "What is the name of the department?",
			},
		])
		.then((answers) => {
			db.query(`INSERT INTO departments (name) VALUES (?)`, [answers.add_dept]);
			console.log(
				"*****" + answers.add_dept + " has been added to Departments*****"
			);
			return employeeTrackerStart();
		});
};

//View all Roles
const allRoles = () => {
	db.query(
		`SELECT roles.id, roles.title, roles.salary, departments.name 
	AS department_name 
	FROM roles 
	LEFT JOIN departments 
	ON roles.department_id = departments.id`,
		(err, rows) => {
			console.table(rows);
			if (err) console.log(err);
			return employeeTrackerStart();
		}
	);
};

//Add a role
const addRole = () => {
	db.query(`SELECT * FROM departments`, async (err, res) => {
		if (err) throw err;

		let deptNamesArray = [];
		res.forEach((departments) => {
			deptNamesArray.push(departments.name);
		});

		return inquirer
			.prompt([
				{
					name: "title",
					type: "input",
					message: "What is the name of the role?",
				},
				{
					name: "salary",
					type: "input",
					message: "What is the salary of the role?",
				},
				{
					name: "departmentId",
					type: "list",
					choices: deptNamesArray,
					message: "Which department does the role belong to?",
				},
			])
			.then((answers) => {
				let departmentId;

				res.forEach((department) => {
					if (answers.departmentId === department.name) {
						departmentId = department.id;
					}
				});

				db.query(
					`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
					[answers.title, answers.salary, departmentId]
				);
				console.log("*****" + answers.title + " has been added to Roles*****");
				return employeeTrackerStart();
			});
	});
};

// View all employees

const allEmployees = () => {
	db.query(
		`SELECT employees.id, 
	employees.first_name, 
	employees.last_name, 
	roles.title AS role, 
	departments.name AS 'department', 
	roles.salary
	FROM employees, roles, departments
	WHERE departments.id = roles.department_id 
	AND roles.id = employees.role_id
	`,
		(err, rows) => {
			console.table(rows);
			if (err) console.log(err);
			return employeeTrackerStart();
		}
	);
};

// Add Employee

const addEmployee = () => {
	db.query(`SELECT * FROM roles`, async (err, res) => {
		if (err) throw err;

		let roleNamesArray = [];
		res.forEach((roles) => {
			roleNamesArray.push(roles.title);
		});

		return inquirer
			.prompt([
				{
					name: "first_name",
					type: "input",
					message: "What is the employee's first name?",
				},
				{
					name: "last_name",
					type: "input",
					message: "What is the employee's last name?",
				},
				{
					name: "role",
					type: "list",
					choices: roleNamesArray,
					message: "What is the employee's role?",
				},
			])
			.then((answers) => {
				let roleId;

				res.forEach((role) => {
					if (answers.role === role.title) {
						roleId = role.id;
					}
				});

				db.query(
					`INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`,
					[answers.first_name, answers.last_name, roleId]
				);
				console.log(
					"*****" + answers.first_name + " has been added to Employees*****"
				);

				return employeeTrackerStart();
			});
	});
};

// Update Employee

const updateEmployee = () => {
	db.query(`SELECT * FROM roles`, async (err, res) => {
		if (err) throw err;

		let roleNamesArray = [];
		res.forEach((roles) => {
			roleNamesArray.push(roles.title);
		});
		// console.log(roleNamesArray);

		db.query(
			`SELECT CONCAT(first_name," ", last_name) AS Name, id, role_id FROM employees`,
			async (err, res) => {
				if (err) throw err;

				let employNamesArray = [];
				res.forEach((employees) => {
					employNamesArray.push(employees.Name);
				});
				// 		console.log(employNamesArray);
				// console.log(roleNamesArray);

				return inquirer
					.prompt([
						{
							name: "Name",
							type: "list",
							choices: employNamesArray,
							message: "Which employees role do you want to update?",
						},
						{
							name: "newRole",
							type: "list",
							choices: roleNamesArray,
							message:
								"Which role do you want to assign the selected employee?",
						},
					])
					.then((answers) => {
						let nameId;
						res.forEach((employees) => {
							if (answers.Name === employees.Name) {
								nameId = employees.id;
							}
						});
						// console.log(nameId);
						db.query(`SELECT * FROM roles`, async (err, res) => {
							if (err) throw err;

							let roleNamesArray = [];
							res.forEach((roles) => {
								roleNamesArray.push(roles.title);
							});

							res.forEach((roles) => {
								if (answers.newRole === roles.title) {
									newRoleId = roles.id;
								}
							});
							db.query(
								`UPDATE employees SET role_id = ? WHERE id = ?`,
								[newRoleId, nameId],
							
							);
							console.log("*****Updated employee's role*****");
						});
						// return employeeTrackerStart()
					});
			}
		);
	});
};

employeeTrackerStart();

//required to connect to the server and port
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
