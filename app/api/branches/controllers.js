
const mysqlConnection = require('../../config/connection')


exports.getBranches = function(req , res) {

    mysqlConnection.query('SELECT * from branch' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

