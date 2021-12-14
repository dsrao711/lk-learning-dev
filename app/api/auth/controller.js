const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Authentication = require('../utils/auth')
var mysqlConnection = require('../../config/connection')

// App register
exports.registerStudent = function (req, res) {
    console.log(req.body.student_name)

    // Users request body 
    const student_name = req.body.student_name;
    const student_password = req.body.student_password;
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

    // Hashing the password asyncronously 
    const salt_rounds = 10;

    bcrypt.genSalt(salt_rounds).then(salt => {
        bcrypt.hash(student_password, salt).then(hash => {
            console.log(hash)
            // Check if user already exists (MOBILE NUMBER) 
            mysqlConnection.query("SELECT * FROM student WHERE student_mobile_number = ?", [student_mobile_number], (err, rows, fields) => {
                if (rows.length) {
                    res.status(409).json({ "message" : "User already exists"})
                } else {
                    // Insert
                    mysqlConnection.query("INSERT INTO student(student_id , student_name , student_password , student_mobile_number , student_email , student_state , student_district , student_taluka , college_id , university_id , branch_id , course_id , semester_id , student_edu_status , student_academic_yr) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [0, student_name, hash, student_mobile_number, student_email, student_state, student_district, student_taluka, college_id, university_id, branch_id, course_id, semester_id, student_edu_status, student_academic_yr], (err, rows, fields) => {
                        if (!err) {
                            res.status(200).send(rows);
                        } else {
                            res.status(401).send(err)
                        }
                    })
                }
            })
        })
    })

}

// Test
exports.test = function (req, res) {
    res.send("Success")
}

// App login 
exports.login = function (req, res) {

    // Steps
    // Take input from user
    // Check if mobile number exists
    // if Yes , match passwrd  
    // If password matched = > Log in
    // If no => Incorrect creds

    const student_mobile_number = req.body.student_mobile_number
    console.log(student_mobile_number)

    const student_password = req.body.student_password
    try{
        mysqlConnection.query("SELECT * FROM student where student_mobile_number = ?", [student_mobile_number], (err, rows, fields) => {

            // Check if user exists by finding Mobile number in DB
    
            if (rows.length == 0) {
                res.status(400).json({message : "Mobile number not registered!"})
            }
            // Check if password matches
            else {
                // Pwd from DB
                pwd = rows[0]['student_password']
                student_name = rows[0]['student_name']
                student_id = rows[0]['student_id']
    
                // Compare users input with original pwd in DB
                bcrypt.compare(student_password, pwd).then(function (result) {
    
                    if (result === true) {
                        console.log("Password matched!!")
                        // Generating new access token
                        const auth = new Authentication()
                        const data = {
                            mobile_number: student_mobile_number , 
                            id : student_id,
                            role : 'student'
                        } 
                        // create token
                        const token = auth.createToken(data)
                        console.log(token)
                        // Send response with the token
                        res.status(200).json({message : "Successfully logged in!" , token : token , mobile_number : student_mobile_number , name : student_name })
    
                    } else {
                        res.status(401).json({message : "Incorrect credentials"  , err : "Unauthorized access"})
                    }
                });
            }
    
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    

}

