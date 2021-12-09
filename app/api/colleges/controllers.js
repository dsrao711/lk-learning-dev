
const mysqlConnection = require('../../config/connection')


exports.getColleges = function(req , res) {

    mysqlConnection.query('SELECT * from college' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

