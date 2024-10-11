const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
c// Import the mysql2 package
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',          // Replace with your host
  user: 'root',               // Replace with your MySQL username
  password: 'Prashant96@',    // Replace with your MySQL password
  database: 'student_records'  // Replace with your MySQL database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});


// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes for CRUD operations

// 1. Create a student (POST)
app.post('/students', (req, res) => {
  const { name, class: studentClass, roll_number } = req.body;
  const query = 'INSERT INTO student (name, class, roll_number) VALUES (?, ?, ?)';
  
  db.query(query, [name, studentClass, roll_number], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send(`Student added with ID: ${result.insertId}`);
  });
});

// 2. Read all students (GET)
app.get('/students', (req, res) => {
  const query = 'SELECT * FROM student';
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
});

// 3. Read a single student by ID (GET)
app.get('/students/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM student WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json(result[0]);
  });
});

// 4. Update a student by ID (PUT)
app.put('/students/:id', (req, res) => {
  const { id } = req.params;
  const { name, class: studentClass, roll_number } = req.body;
  const query = 'UPDATE student SET name = ?, class = ?, roll_number = ? WHERE id = ?';

  db.query(query, [name, studentClass, roll_number, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Student updated successfully');
  });
});

// 5. Delete a student by ID (DELETE)
app.delete('/students/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM student WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Student not found');
    }
    res.status(200).send('Student deleted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
