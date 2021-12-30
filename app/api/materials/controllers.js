
const mysqlConnection = require('../../config/connection')
const mySqlConnection = require('../../config/connection')
var getUniversities = require('../utils/getUniversity')
var getCourses = require('../utils/getCourses')
var getBranches = require('../utils/getBranches')
var getSemesters = require('../utils/getSem')
var getAuthors= require('../utils/getAuthors')
var getSubjects = require('../utils/getSubjects')
var getCategories = require('../utils/getCategories')
var getTopics = require('../utils/getTopics')

// Admin panel 
// Get materials page

exports.getMaterialsPage = async function (req, res) {

    const universities = await getUniversities()
    const courses = await getCourses()
    const branches = await getBranches()
    const sem = await getSemesters()
    const authors = await getAuthors()
    const subjects = await getSubjects()

    try {   
        var sql_statement = `
        SELECT 
            m.material_name , m.material_acad_type , m.material_cost_type, m.material_id,
            m.material_cost , a.author_name , s.semester_name , 
            c.course_name , b.branch_name
        FROM material as m
            JOIN author as a ON m.author_id = a.author_id
            JOIN semester as s ON m.semester_id = s.semester_id
            JOIN course as c ON c.course_id = m.course_id
            JOIN branch as b ON m.branch_id = b.branch_id
    `
        mysqlConnection.query(sql_statement, (err, rows) => {
            if (!err) {
                console.log(rows)
                console.log("Sending")
                res.status(200)
                .render('materials/materials.ejs' , {
                    data : rows, 
                    universities : universities , 
                    courses : courses , 
                    branches : branches, 
                    semesters : sem , 
                    authors : authors ,
                    subjects : subjects ,
                })
            } else {
                console.log(err)
                res
                .status(400)
                .json({"message" : err})
            }
        })
    }catch(err){
        res.send(500).json({"message" : "Internal server error" , "Error" : err})
    }   
}

exports.addMaterial = async function(req,res){

    var author_id = req.body.author_id 
    var material_name = req.body.material_name
    var material_description = req.body.material_description
    var subject_id = req.body.subject_id 
    var semester_id = req.body.semester_id 
    var branch_id = req.body.branch_id 
    var course_id = req.body.course_id 
    var material_acad_type = req.body.material_acad_type 
    var material_cost_type = req.body.material_cost_type 
    var material_cost = req.body.material_cost 

    var sql_statement =    `
        INSERT INTO
            material(
                material_name , material_description , 
                author_id , 
                subject_id , semester_id , 
                branch_id , course_id , 
                material_acad_type , material_cost_type , 
                material_cost
            )
            VALUES(?,?,?,?,?,?,?,?,?,?)
    `

    var users_input = [
        material_name , 
        material_description , 
        author_id ,
        subject_id , 
        semester_id , 
        branch_id , 
        course_id , 
        material_acad_type , 
        material_cost_type , 
        material_cost
    ]

    console.log(users_input)
    try{
        mysqlConnection.query(sql_statement, users_input, (err, rows) => {
            if (!err) {
                res.status(201).redirect('/materials')
            }
            else{
                res.status(400).send("Failed!!")
            }
            
        })
    }catch(err){
        res
        .status(500)
        .json({ "message": "Internal server error!" })
    }

}

exports.getPlans = async function (req, res) {

    const universities = await getUniversities()
    const courses = await getCourses()
    const branches = await getBranches()
    const sem = await getSemesters()
    const authors = await getAuthors()
    const subjects = await getSubjects()

    var material_id = req.params.id
    const categories = await getCategories(material_id)
    const topics = await getTopics(material_id)

    var sql_statement =  `
            SELECT 
                m.material_id , m.material_name , m.material_cost_type , 
                m.material_description , m.material_cost , m.material_acad_type,
                a.author_id , a.author_name , 
                c.course_id , c.course_name , 
                b.branch_id , b.branch_name ,
                s.subject_id , s.subject_name 
            FROM material as m
                JOIN author as a ON m.author_id = a.author_id
                JOIN course as c ON m.course_id = c.course_id
                JOIN branch as b ON m.branch_id = b.branch_id
                JOIN subject as s ON m.subject_id = s.subject_id 
            WHERE m.material_id = ?
    `
    mySqlConnection.query(sql_statement , [material_id] , (err , rows) => {
        try{
            if(!err){
                console.log(rows[0])
                res
                .status(200)
                .render('materials/plans.ejs' , {
                    data : rows[0] , 
                    universities : universities , 
                    courses : courses , 
                    branches : branches, 
                    semesters : sem , 
                    authors : authors ,
                    subjects : subjects ,
                    categories : categories , 
                    topics : topics 
                })
            }else{
                res
                .status(400)
                .json({"message" : err})
            }
        }catch(err){
            res
            .status(500)
            .json({"error" : err})
        }
    })

        
}

exports.EditMaterial = async function(req , res){
    console.log("heerre.....")

     material_name = req.body.material_name , 
     material_description = req.body.material_description , 
     author_id = req.body.author_id , 
     subject_id = req.body.subject_id , 
     semester_id = req.body.semester_id , 
     branch_id = req.body.branch_id , 
     course_id = req.body.course_id , 
     material_acad_type = req.body.material_acad_type , 
     material_cost_type = req.body.material_cost_type , 
     material_cost = req.body.material_cost, 

    material_id = req.params.id

    var sql_statement = `
        UPDATE material
            SET material_name = ? ,
                author_id = ? , 
                subject_id = ? ,
                semester_id = ? , 
                branch_id = ? , 
                course_id = ? , 
                material_acad_type = ? , 
                material_cost_type = ? ,
                material_cost = ?,
                material_description = ?

        WHERE material_id = ?
    `

    var users_input = [
        material_name , 
        author_id , 
        subject_id , 
        semester_id , 
        branch_id , 
        course_id ,
        material_acad_type ,
        material_cost_type , 
        material_cost , 
        material_description ,
        material_id
    ]

    try{
        mysqlConnection.query(sql_statement, users_input, (err, rows) => {
            if (err) {
                res.status(400).send("failed!!!")
            }
            console.log("UDPATED")
            res
            .status(200)
            .redirect(`/materials/plans/${material_id}`)
        })
    }catch(err){
        res
        .status(500)
        .json({ "message": "Internal server error!" })
    }

}

exports.deleteMaterial = async function(req, res){

    id = req.params.id
    console.log(id)
    var sql_statement = `
        DELETE from material
        WHERE material_id = ?
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


// APIS
// Get all materials
exports.getMaterials = function (req, res) {

    try{
        mySqlConnection.query('SELECT * from material', (err, rows, fields) => {
            if (!err) {
                res.status(200).send(rows)
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}

//Get materials by Sem , Subject , Price range
// Eg : DSA - Paid , 500
exports.getMaterialsFiltered = function (req, res) {

    var semester_id = req.body.semester_id
    var subject_id = req.body.subject_id
    var material_cost = req.body.material_cost
    var author_id = req.body.author_id

    console.log(req.body)

    const sql_statement = `
        SELECT * from material
        WHERE semester_id = ? AND subject_id = ? AND author_id = ? AND material_cost <= ?`

    var input = [semester_id , subject_id , author_id , material_cost]

    try{
        mySqlConnection.query(sql_statement ,input, (err, rows) => {
            if (!err) {
                res.status(200).send({rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error" , "err" : err})
    }
    
}

// Get Category by materials
// Eg : Notes , q paper , formula sheet
exports.getCategoryByMaterial = function (req, res) {

    var material_id = req.body.material_id
    const sql_statement = `
        SELECT * from category 
        WHERE material_id = ?        
        `

    try{
        mySqlConnection.query(sql_statement ,[material_id],(err, rows, fields) => {
            if (!err) {
                res.status(200).json({rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}

// Get topics by category 
// Get all the topics wheere material = ? and category = ?
// Eg : Seaching and sorting , arrays , strings 
exports.getTopics = function (req, res) {

    material_id = req.body.material_id
    category_id = req.body.category_id

    const sql_statement = `
        SELECT 
            t.topic_id , t.topic_name , 
            m.material_name , m.material_id,
            c.category_name , c.category_id
        FROM topic as t
            JOIN material as m ON t.material_id = m.material_id and m.material_id = ?
            JOIN category as c ON c.category_id = t.category_id and c.category_id = ?
    `

    try{
        mySqlConnection.query(sql_statement ,[material_id , category_id], (err, rows) => {
            if (!err) {
                res.status(200).send({rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}

// Get all pdfs 
// eg : searching.pdf , sorting.pdf
exports.getPdfs = function (req, res) {

    topic_id = req.body.topic_id

    const sql_statement = `
        SELECT * from pdf
        WHERE topic_id = ?
    `
    try{
        mySqlConnection.query(sql_statement ,[topic_id], (err, rows) => {
            if (!err) {
                res.status(200).send({rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}

// Get all videos
//eg : searching , sorting .....
exports.getVideos = function (req, res) {

    topic_id = req.body.topic_id

    const sql_statement = `
        SELECT * from video
        WHERE topic_id = ?
    `
    try{
        mySqlConnection.query(sql_statement ,[topic_id], (err, rows) => {
            if (!err) {
                res.status(200).send({rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}
