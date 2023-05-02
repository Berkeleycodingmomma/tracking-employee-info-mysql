const mysql2 = require('mysql2');
require('dotenv').config();

// Below we are creating our connection string function
const connection = mysql2.createConnection({
  // host: 'localhost',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

module.exports=connection

