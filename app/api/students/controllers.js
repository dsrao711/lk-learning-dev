const { useColors } = require('debug/src/browser')
const mysqlConnection = require('../../config/connection')
var mySqlConnection = require('../../config/connection')
// Get users 
// 1. Get data from db
// Form a list of data fetched 
// Send the data to ejs
exports.getStudents = function(req, res) {

    mysqlConnection.query('SELECT * from student' , (err  ,rows , fields ) => {
        if(!err){
            res
            .status(200)
            .render('students/students.ejs' , {data : rows})
        }else{
            res.send(fields)
        }
    })
    
}