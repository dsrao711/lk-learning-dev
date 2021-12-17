var mysqlConnection = require('../../config/connection')

getDistricts = () => {

    sql_statement = `SELECT * from  district`
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement, (err, rows) => {
            if (err) {
                return reject(err)
            } 
            return resolve(rows)
        })
    })
    
}

module.exports = getDistricts ; 

 