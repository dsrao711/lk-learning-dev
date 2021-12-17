var mysqlConnection = require('../../config/connection')

getColleges = () => {
    sql_statement = 'SELECT * from college'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getColleges ; 