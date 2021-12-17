var mysqlConnection = require('../../config/connection')

getBranches = () => {
    sql_statement = 'SELECT * from branch'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getBranches ; 