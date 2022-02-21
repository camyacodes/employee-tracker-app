const express = require("express");
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'C$ocks2016!',
    database: 'employee_tracker'
  },
  console.log('Connected to the employee_tracker database.')
);

db.query(`SELECT * FROM departments`, (err, rows) => {
  console.log(rows);
});

// Create a candidate
const sql = `INSERT INTO departments (id, name) 
              VALUES (?,?)`;
const params = [5, 'Meat'];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});




app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
