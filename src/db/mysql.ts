import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    host: '127.0.0.1',
    user:'root',
    password: 'Fuck_*em_up!',
    database: 'pizza_app'
  });
  
db.connect((err) => {
    if (err) {
      console.log(process.env.MYSQL_HOST);
      
        console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL');
    }
});

export default db;