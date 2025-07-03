// backend/db.js
require('dotenv').config(); 
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  database: 'flashcards_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = pool;


