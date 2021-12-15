
const mysqlConnection = require('../../config/connection')

// Get courses api
exports.getCourses = function(req , res) {

    mysqlConnection.query('SELECT * from course' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

// Get page
exports.getCoursesPage = function(req , res) {

    try{
        res
        .status(200)
        .render('courses/courses.ejs')
    }catch(err){
        res
        .status(500)
        .send("Internal server error")
    }

}


