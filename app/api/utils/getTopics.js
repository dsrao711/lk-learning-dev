var mysqlConnection = require('../../config/connection')

getTopics = (material_id) => {
    sql_statement = 'SELECT * from topic WHERE material_id = ?'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , [material_id] , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getTopics ; 