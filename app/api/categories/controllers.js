
const mysqlConnection = require('../../config/connection')


exports.getCategories = function(req , res) {

    mysqlConnection.query('SELECT * from Category' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

