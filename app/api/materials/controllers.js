
const mysqlConnection = require('../../config/connection')
const mySqlConnection = require('../../config/connection')

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
// Get all the topics 
exports.getTopics = function (req, res) {

    const sql_statement = `
        SELECT 
            t.topic_id , t.topic_name , 
            m.material_name , m.material_id,
            c.category_name , c.category_id
        FROM topic as t
            JOIN material as m ON t.material_id = m.material_id
            JOIN category as c ON c.category_id = t.category_id
    `

    try{
        mySqlConnection.query(sql_statement , (err, rows) => {
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

