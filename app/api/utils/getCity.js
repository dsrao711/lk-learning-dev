var mysqlConnection = require('../../config/connection')

const getStates = () => {

    sql_statement = `SELECT * from  city`
    mysqlConnection.query(sql_statement, (err, rows, fields) => {
        if (!err) {
            console.log(rows)
            return rows
        } else {
            return "Error"
        }
    })
}

module.exports = getStates ; 

 