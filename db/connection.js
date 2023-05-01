// const mysql = require('mysql2');
// require('dotenv').config();

// Below we are creating our connection string function
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'database_db'
});

module.exports = db;



// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   // MySQL host name
//   host: '127.0.0.1', // CHANGE THIS FROM 'localhost' to '127.0.0.1'
//   // MySQL username,
//   user: 'root',
//   // MySQL password
//   password: 'password',
//   // MySQL Schema/DB name
//   database: 'database_db'
// }); 

// module.exports = db;