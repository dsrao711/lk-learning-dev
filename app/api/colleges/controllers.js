
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



// exports.getColleges = function(req , res){
//     var sql_statement = `
//         SELECT *
//     `
    
//     try{
//         mySqlConnection.query(sql_statement , (err , rows , fields) => {
//             if(!err){
//                 console.log("Getting states....")
//                 res
//                 .status(200)
//                 .send(rows)
//             }else{
//                 console.log("error" , err)
//                 res
//                 .status(400)
//                 .json({"message" : err})
//             }
//         })
//     }catch(err){
//         res
//         .status(500)
//         .json({"message"  :"Internal server error"})
//     }
// }