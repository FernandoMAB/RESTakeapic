const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'takeapic.mysql.database.azure.com',
    user:'sebas@takeapic',
    password:'takeapicXD123',
    database: 'takeapic',
    port: 3306
});

module.exports = pool;