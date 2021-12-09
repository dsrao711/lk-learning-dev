
const mySqlConnection = require('../../config/connection')


exports.getMaterials = function(req , res) {

    mySqlConnection.query('SELECT * from material' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

exports.getAcademicMaterials = function(req, res){
    mySqlConnection.query('SELECT * FROM material WHERE material_use_type = "academic" ' ,  (err , rows , fields) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })
}

exports.getNonAcademicMaterials = function(req, res){
    mySqlConnection.query('SELECT * FROM material WHERE material_use_type = "non-academic" ' ,  (err , rows , fields) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })
}