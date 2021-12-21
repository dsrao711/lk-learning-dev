
const mysqlConnection = require('../../config/connection')
const mySqlConnection = require('../../config/connection')

// Admin panel 
// Get materials page

exports.getMaterialsPage = function (req, res) {

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
                .render('materials/materials.ejs' , {data : rows})
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

exports.getPlans = function (req, res) {
    var material_id = req.params.id
    try {   

        console.log(material_id)
        var sql_statement = `
                SELECT 
                    m.material_name , m.material_acad_type , m.material_cost_type, m.material_id,
                    m.material_cost , a.author_name , s.semester_name , 
                    c.course_name , b.branch_name , 
                    ct.category_id , ct.category.name 
                FROM material as m
                    JOIN Category as ct m.material_id = ct.material_id
                    JOIN author as a ON m.author_id = a.author_id
                    JOIN semester as s ON m.semester_id = s.semester_id
                    JOIN course as c ON c.course_id = m.course_id
                    JOIN branch as b ON m.branch_id = b.branch_id
                    
        `

        mysqlConnection.query(sql_statement, (err, rows) => {
            if (!err) {
                console.log(rows)
                console.log("Sending")
                res.send(rows)
            } else {
                console.log(err)
                res
                .status(400)
                .json({"message" : err})
            }
        })
        res.send(material_id)

    }catch(err){
        res.send(500).json({"message" : "Internal server error" , "Error" : err})
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

//Get materials by Sem
// Eg : DSA - Paid , 500
exports.getMaterialsBySem = function (req, res) {

    var semester_id = req.body.material_sem_id
    const sql_statement = 'SELECT * from material where semester_id = ?'

    try{
        mySqlConnection.query(sql_statement , [semester_id] , (err, rows, fields) => {
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
                res.status(200).send(rows)
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
                res.status(200).send(rows)
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
                res.status(200).send(rows)
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
                res.status(200).send(rows)
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}
