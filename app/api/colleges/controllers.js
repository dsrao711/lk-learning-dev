
const mysqlConnection = require('../../config/connection')
const getUniversities = require('../utils/getUniversity')

// API
exports.getColleges = function(req , res) {

    mysqlConnection.query('SELECT * from college' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}


exports.getCollegesPage = async function(req , res){
    const universities = await getUniversities()
    var sql_statement = `
        SELECT 
            c.college_id , c.college_name , 
            u.university_name 
        FROM college as c
        JOIN university as u ON c.university_id = u.university_id
    `
    try{
        mysqlConnection.query(sql_statement , (err , rows , fields) => {
            if(!err){
                console.log("Getting colleges...")
                console.log(rows)
                res
                .status(200)
                .render('colleges/colleges.ejs' , {
                    data : rows, 
                    universities : universities
                })
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
        .json({"message"  :"Internal server error" })
    }
}

exports.editCollege = async function(req , res){
    const universities = await getUniversities()
    var sql_statement = `
        UPDATE college
            SET college_name = ? ,
                university_id = ? 
        WHERE college_id = ?
    `
    try{
        mysqlConnection.query(sql_statement , (err , rows , fields) => {
            if(!err){
                console.log("Getting colleges...")
                console.log(rows)
                res
                .status(200)
                .render('colleges/colleges.ejs' , {
                    data : rows, 
                    universities : universities
                })
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
        .json({"message"  :"Internal server error" })
    }
}