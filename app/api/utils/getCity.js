var mysqlConnection = require('../../config/connection')

getCities = () => {

    sql_statement = `SELECT * from  city`
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement, (err, rows) => {
            if (err) {
                return reject(err)
            } else {
                return resolve(rows)
            }
        })
    })
}

module.exports = getCities ; 

 