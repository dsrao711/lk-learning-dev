var mysql = require('mysql2')

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'dtechblr_dtechblradmin',
    password: '$~l2hy);{SKD',
    database: 'dtechblr_lklearning'
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