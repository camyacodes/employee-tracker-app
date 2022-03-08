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
				choices: ["View all Departments", "Add Department"],
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

employeeTrackerStart();


//required to connect to the server and port
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
