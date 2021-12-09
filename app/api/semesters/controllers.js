
const mysqlConnection = require('../../config/connection')


exports.getSemesters = function(req , res) {

    mysqlConnection.query('SELECT * from semester' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

