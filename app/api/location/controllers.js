var mySqlConnection = require('../../config/connection')

exports.getState = function(req , res){
    var sql_statement = 'SELECT * from state'
    try{
        mySqlConnection.query(sql_statement , (err , rows , fields) => {
            
        })
    }catch(err){
        res
        .status(500)
        .json({"message"  :"Internal server error"})
    }
}