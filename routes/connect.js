const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hastle1122',
    database: 'social'
});

module.exports = db;