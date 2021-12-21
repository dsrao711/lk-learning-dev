var mysqlConnection = require('../../config/connection')

getAuthors = () => {
    sql_statement = 'SELECT * from subject'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getAuthors ; 