
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

// Get all acad materials
exports.getAcademicMaterials = function (req, res) {
    try{
        mySqlConnection.query('SELECT * FROM material WHERE material_academic_type = "academic" ', (err, rows, fields) => {
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

// Get all non acad materials
exports.getNonAcademicMaterials = function (req, res) {

    try{
        mySqlConnection.query('SELECT * FROM material WHERE material_academic_type = "non-academic" ', (err, rows, fields) => {
            if (!err) {
                res.status(200).send(rows)
            } else {
                res.status(400).send(fields)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }
    
}

// Get all materials info according to sem input given by user
exports.getMaterialsBySemester = function (req, res) {
    sem_input = req.body.material_sem_id
    try { 
        query = 'SELECT material.material_name , author.author_name , material.material_cost , Category.category_type FROM material JOIN author ON author.author_id = material.author_id JOIN Category ON material.category_id = Category.category_id  WHERE material.material_sem_id = ?' 
        mysqlConnection.query(query,[sem_input], (err, rows, fields) => {
            if (!err) {
                res.status(200).send(rows)
            } else {
                res.status(400).send(err)
            }
        })

    }catch(err){
        res.status(500).send(err)
    }
    
}

// Get all materials info according to sem and category input given by user 
exports.getMaterialsByCategoryandSem = function(req, res) {

    sem_input = req.body.material_sem_id
    category_input = req.body.material_category_id

    try{
        query = 'SELECT material.material_name , Category.category_name FROM material JOIN Category ON material.category_id = Category.category_id  WHERE material.material_sem_id = ? AND material.category_id = ?' 
        mysqlConnection.query(query,[sem_input , category_input], (err, rows, fields) => {
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