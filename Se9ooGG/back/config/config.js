const mysql = require('mysql');

const config = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  database: 'se9oo_gg',
  user: 'root',
  password: '!1Qkrtpgus',
});

module.exports = config;