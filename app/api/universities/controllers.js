
const mysqlConnection = require('../../config/connection')


exports.getUniversities = function(req , res) {

    mysqlConnection.query('SELECT * from university' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

exports.getUniversitiesPage = function(req , res) {

    res.send("Universities page")

}

