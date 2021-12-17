const { useColors } = require('debug/src/browser')
var mysqlConnection = require('../../config/connection')
var getStates = require('../utils/getStates')
var getDistricts = require('../utils/getDistricts')
var getCities = require('../utils/getCity')
var getUniversities = require('../utils/getUniversity')
var getColleges = require('../utils/getCollege')
var getCourses = require('../utils/getCourses')
var getBranches = require('../utils/getBranches')
var getSemesters = require('../utils/getSem')

// Get students page
exports.getStudents = async function (req, res) {

    const states = await getStates()
    const districts = await getDistricts()
    const cities = await getCities()
    const universities = await getUniversities()
    const colleges = await getColleges()
    const courses = await getCourses()
    const branches = await getBranches()
    const sem = await getSemesters()

    var sql_statement = `
    SELECT 
        s.student_id , s.student_name , s.student_email , s.student_mobile_number ,
        st.state_title , d.district_title , ct.name , 
        s.student_edu_status , s.student_academic_yr , 
        c.college_name ,cr.course_name , b.branch_name , 
        sem.semester_name , u.university_name  
    FROM student AS s
        JOIN college AS c ON s.college_id = c.college_id
        JOIN course AS cr ON s.course_id = cr.course_id
        JOIN branch AS b ON s.branch_id = b.branch_id
        JOIN semester AS sem ON s.semester_id = sem.semester_id
        JOIN university AS u ON s.university_id = u.university_id
        JOIN state AS st ON s.state_id = st.state_id
        JOIN district AS d ON s.district_id = d.districtid
        JOIN city AS ct ON s.city_id = ct.id

    `

    mysqlConnection.query(sql_statement, (err, rows, fields) => {
        if (!err) {
            res.status(200)
                .render('students/students.ejs', {
                    data: rows,
                    states: states,
                    districts: districts,
                    cities: cities,
                    universities: universities,
                    colleges: colleges,
                    courses: courses,
                    branches: branches,
                    sem: sem
                })
        } else {
            console.log(err)
            res.send(fields)
        }
    })

}

// Update student 
exports.editStudent = async function (req, res) {
    console.log(req.body)
    
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
    const student_acad_yr = req.body.student_acad_yr
    const student_edu_status = req.body.student_edu_status
    const student_id = req.body.student_id

    const states = await getStates()
    const districts = await getDistricts()
    const cities = await getCities()
    const universities = await getUniversities()
    const colleges = await getColleges()
    const courses = await getCourses()
    const branches = await getBranches()
    const sem = await getSemesters()

    var sql_statement = `
    UPDATE student 
        SET student_name = ? , 
            student_mobile_number = ? ,
            student_email = ? ,
            state_id = ? , 
            district_id = ? ,
            city_id = ? ,
            college_id = ? , 
            branch_id = ? ,
            semester_id = ? ,   
            university_id = ? , 
            course_id = ? ,
            student_edu_status = ? , 
            student_academic_yr = ?
    WHERE student_id = ? ;
    `
    var users_input = [student_name, student_mobile_number, student_email,
        student_state, student_district, student_taluka,
        college_id, branch_id, semester_id, university_id,
        course_id, student_edu_status, student_acad_yr, student_id, student_id];

    try {
        mysqlConnection.query(sql_statement, users_input, (err, rows) => {
            if (err) {
                res.status(400).send("failed!!!")
            }
            console.log("UDPATED")
            res
            .status(200)
            .redirect('/students')
        })
    } catch (err) {
        res
            .status(500)
            .json({ "message": "Internal server error!" })
    }
}

exports.deleteStudent = async function(req, res){
    id = req.params.id
    console.log(id)
    var sql_statement = `
        DELETE from student
        WHERE student_id = ?
    `
    try {
        mysqlConnection.query(sql_statement, [id], (err, rows) => {
            if (err) {
                res.send(err)
            }
            console.log("DELETED")
            res
            .status(200)
            .redirect('/students')
        })
    } catch (err) {
        res
            .status(500)
            .json({ "message": "Internal server error!" })
    }

}

