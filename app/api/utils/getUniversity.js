var mysqlConnection = require('../../config/connection')

getUniversities = () => {
    sql_statement = 'SELECT * from university'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getUniversities ; 