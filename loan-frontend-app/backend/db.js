const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // or your MySQL username
  password: '', // or your MySQL password
  database: 'loan_system', // name of the DB you created
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;