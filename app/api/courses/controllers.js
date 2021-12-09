
const mysqlConnection = require('../../config/connection')


exports.getCourses = function(req , res) {

    mysqlConnection.query('SELECT * from course' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

