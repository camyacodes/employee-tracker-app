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

// Get all departments
// db.query(`SELECT * FROM departments`, (err, rows) => {
//   console.table(rows);
// });

inquirer
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
		// view all departments shows full table from query
    let {initial} = answers
		if (initial === "View all Departments") {
			db.query(`SELECT * FROM departments`, (err, rows) => {
				console.table(rows);
			});
    } else {

      console.log("add department")
    }
    
	})
	.catch((err) => {
		console.log(err);
	});
// Create a candidate
// const sql = `INSERT INTO departments (id, name)
//               VALUES (?,?)`;
// const params = [5, 'Meat'];

// db.query(sql, params, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
	res.status(404).end();
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
