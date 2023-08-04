require("dotenv").config();
const mysql = require('mysql2');

const pool = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    }
);

pool.on('connection', (stream) => {
    console.log('Connected to MySQL Server!');
});

module.exports = pool.promise();
