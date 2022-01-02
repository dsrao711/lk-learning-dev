var mysqlConnection = require('../../config/connection')

getCollegeBranches = () => {
    sql_statement = `
        SELECT 
            cb.branch_id , 
            b.branch_name
        FROM college_branch as cb
        JOIN branch as b ON b.branch_id = cb.branch_id
        WHERE college_id = ?
    `
    var user_input = ['123']
    return new Promise((resolve , reject) => {
        mysqlConnection.query(sql_statement , user_input , (err , rows) => {
            if(err){
                return reject(err)
            }
            return resolve(rows)
        })
    })
}

module.exports = getCollegeBranches ; 