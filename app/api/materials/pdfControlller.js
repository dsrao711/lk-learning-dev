const mySqlConnection = require('../../config/connection')

exports.managePdfs= async function(req , res){

    res.send(req.params.id)

}