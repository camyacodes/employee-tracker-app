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
		res.forEach((departments) => {deptNamesArray.push(departments.name);});

		console.log(deptNamesArray)

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
				  if (answers.departmentId === department.name) {departmentId = department.id;}
				});

				console.log(departmentId)

				db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [
					answers.title,
					answers.salary,
					departmentId
				]);
				return employeeTrackerStart();
			});
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
