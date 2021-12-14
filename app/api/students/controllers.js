const { useColors } = require('debug/src/browser')
const mysqlConnection = require('../../config/connection')
var mySqlConnection = require('../../config/connection')

// Get users 
// 1. Get data from db
// Form a list of data fetched 
// Send the data to ejs
exports.getStudents = function(req, res) {


    var sql_statement = `
    SELECT 
        s.student_name , s.student_email , s.student_mobile_number ,
        s.student_state , s.student_district , s.student_taluka , c.college_name ,
        cr.course_name , b.branch_name , sem.semester_name , 
        u.university_name  
    FROM student AS s
        JOIN college AS c ON s.college_id = c.college_id
        JOIN course AS cr ON s.course_id = cr.course_id
        JOIN branch AS b ON s.branch_id = b.branch_id
        JOIN semester AS sem ON s.semester_id = sem.semester_id
        JOIN university AS u ON s.university_id = u.university_id
    `

    mysqlConnection.query(sql_statement , (err  ,rows , fields ) => {
        if(!err){
            console.log(rows)
            res
            .status(200)
            .render('students/students.ejs' , {data : rows})
            
        }else{
            console.log(err)
            res.send(fields)
        }
    })
    
}

// Update student 

exports.editStudent = function(req, res) {
    console.log(req.body)
    // Input
    const student_name = req.body.student_name;
    const student_mobile_number = req.body.student_mobile_number
    const student_email = req.body.student_email
    const student_state = req.body.student_state
    const student_district = req.body.student_district
    const student_taluka = req.body.student_taluka
    const college_id = req.body.college_id
    const university_id = req.body.university_id
    const course_id = req.body.course_id
    const branch_id = req.body.branch_id
    const semester_id = req.body.semester_id
    const student_edu_status = req.body.student_edu_status
    const student_academic_yr = req.body.student_academic_yr

    sql_statement = 'UPDATE student SET student_name = ? , student_mobile_number = ? , student_email = ? , student_state = ? , student_taluka =  ? , student _district = ? '
    mysqlConnection.query()



    

    
}