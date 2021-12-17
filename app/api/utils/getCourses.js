var mysqlConnection = require('../../config/connection')

getCourses = () => {
    sql_statement = 'SELECT * from course'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getCourses ; 