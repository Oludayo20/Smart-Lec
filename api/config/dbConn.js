const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'MySQL090345.oludayo',
  database: 'smart_lec',
  multipleStatements: true, // Enable multiple statements
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
