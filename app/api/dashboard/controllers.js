const mySqlConnection = require('../../config/connection')

exports.displayDashboard = function(req, res) {

    try{
        mySqlConnection.query('SELECT COUNT(*) as count from student' , (err, rows , fields) => {
        
            if(!err){
                json = rows[0]
                students_count = rows[0].count
                res.status(200).render('dashboard/dashboard.ejs' , {students : students_count})
            }else{
                res.status(400).json({"message" : err})
            }
            
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server err"} )
    }
    
}