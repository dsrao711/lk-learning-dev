var mySqlConnection = require('../../config/connection')

exports.getState = function(req , res){
    var sql_statement = 'SELECT * from state'
    try{
        mySqlConnection.query(sql_statement , (err , rows , fields) => {
            if(!err){
                console.log("Getting states....")
                res
                .status(200)
                .send(rows)
            }else{
                console.log("error" , err)
                res
                .status(400)
                .json({"message" : err})
            }
        })
    }catch(err){
        res
        .status(500)
        .json({"message"  :"Internal server error"})
    }
}


exports.getDistrict = function(req, res) {

    var state_input = req.body.state_id

    var sql_statement = `SELECT * from  district `
    try{
        mySqlConnection.query(sql_statement , [state_input] ,(err , rows , fields) => {
            if(!err){
                console.log("Getting states....")
                res
                .status(200)
                .send(rows)
            }else{
                console.log("error" , err)
                res
                .status(400)
                .json({"message" : err})
            }
        })
    }catch(err){
        res
        .status(500)
        .json({"message"  :"Internal server error"})
    }
}

exports.getCity = function(req , res){

    var district_input = req.body.district_id

    var sql_statement = `SELECT * FROM city`

    try{
        mySqlConnection.query(sql_statement , [district_input] ,(err , rows , fields) => {
            if(!err){
                console.log("Getting states....")
                res
                .status(200)
                .send(rows)
            }else{
                console.log("error" , err)
                res
                .status(400)
                .json({"message" : err})
            }
        })
    }catch(err){
        res
        .status(500)
        .json({"message"  :"Internal server error"})
    }
}
