var mysqlConnection = require('../../config/connection')

getSemesters = () => {
    sql_statement = 'SELECT * from semester'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getSemesters ; 