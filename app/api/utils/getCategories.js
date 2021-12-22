var mysqlConnection = require('../../config/connection')

getCourses = (material_id) => {
    sql_statement = 'SELECT * from category WHERE material_id = ?'
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , [material_id] , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getCourses ; 