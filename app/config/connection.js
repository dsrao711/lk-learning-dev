var mysql = require('mysql2')
require('dotenv').config()

var mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_name
})

// Connection

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connection successfull...")
    } else {
        console.log("Connection failed :( ")
    }
})

module.exports = mysqlConnection;