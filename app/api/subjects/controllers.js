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