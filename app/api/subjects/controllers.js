var mySqlConnection = require('../../config/connection')

exports.getSubjectsPage = function(req,res){
    res.render('subjects/subjects.ejs')
}

exports.getSubjects = function(req,res){
    sem_id = req.body.sem_id
    try{
        mySqlConnection.query('SELECT * from subject WHERE semester_id = ?', [sem_id] , (err, rows) => {
            if (!err) {
                res.status(200).json({data : rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error" , "error" : err})
    }
}

exports.getSubjectsByAuthors = function(req,res){

    var subject_id = req.body.subject_id
    var sql_statement =  `
        SELECT 
            m.author_id , a.author_name
        FROM material as m
        JOIN author as a ON m.author_id = a.author_id
        WHERE subject_id = ?
    `

    try{
        mySqlConnection.query(sql_statement, [subject_id] , (err, rows) => {
            if (!err) {
                res.status(200).json({data : rows})
            } else {
                res.status(400).send(err)
            }
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server error" , "error" : err})
    }
}