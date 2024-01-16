const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
app.use(express.json());
const port = 3000;

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Fuck_*em_up!',
  database: 'pizza_app'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.post('/users', (req, res) => {
    const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.phone,
    ]
    db.query(sql, values, (err, data) => {
      if (err) {
        console.log(values);
        return res.json("Error");
      }
      return res.json(data);
    })
})

app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users WHERE `email` = ? AND `passwoed` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return
    }
    if (result.lenght > 0) {
      return res.json(result);
    } else {
      return res.json("Faile")
    }
  })
})


app.get('/pizza_menu', (req, res) => {
  db.query('SELECT * FROM pizza_menu', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


