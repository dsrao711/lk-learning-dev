const mySqlConnection = require('../../config/connection')
require('dotenv').config()

exports.displayDashboard = function(req, res) {

    var sql_statement = ` 
        SELECT table_name, table_rows
        FROM information_schema.tables
        WHERE table_schema = 'dtechblr_lklearning'
        ORDER BY table_name;
    `

    try{
        mySqlConnection.query(sql_statement, (err, rows , fields) => {
        
            if(!err){
                console.log(rows)
                students_count = rows[12].table_rows 
                lecturer_count = rows[0].table_rows 
                material_count = rows[7].table_rows 
                categories_count = rows[2].table_rows
                orders_count = rows[8].table_rows
                
                res.status(200).render('dashboard/dashboard.ejs' , {
                    students : students_count ,
                    lecturer_count : lecturer_count , 
                    material_count : material_count , 
                    orders_count : orders_count
                })
            }else{
                res.status(400).json({"message" : err})
            }
            
        })
    }catch(err){
        res.status(500).json({"message" : "Internal server err"} )
    }
    
}