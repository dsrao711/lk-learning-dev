var mysqlConnection = require('../../config/connection')

const getStates = () => {

    var states ; 
    sql_statement = `SELECT * from state`
    mysqlConnection.query(sql_statement , (err,rows,fields) => {
        if(err){
            throw err
        }
        states = rows; 
    })
    return states
    
}

module.exports = getStates;

