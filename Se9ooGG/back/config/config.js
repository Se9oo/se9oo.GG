const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "host": "127.0.0.1",
  "port": "3306",
  "user": "root",
  "password": process.env.DB_PASSWORD,
  "database": "se9oo_gg",
  "connectionLimit": 10
}