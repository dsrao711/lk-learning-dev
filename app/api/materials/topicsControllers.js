var mysqlConnection = require('../../config/connection')

exports.addTopic = async function(req,res){

    var material_id = req.body.material_id
    var category_id = req.body.category_id
    var topic_name = req.body.topic_name
  
    var sql_statement =    `
        INSERT INTO 
            topic(
                material_id , category_id , 
                topic_name
            )
            VALUES(?,?,?)
    `

    var users_input = [
        material_id , 
        category_id , 
        topic_name,
    ]

    console.log(users_input)
    try{
        mysqlConnection.query(sql_statement, users_input, (err, rows) => {
            if (!err) {
                res.status(201).redirect(`/materials/plans/${material_id}`)
            }
            else{
                res.status(400).send("Failed!!")
                console.log(err)
            }
            
        })
    }catch(err){
        res
        .status(500)
        .json({ "message": "Internal server error!" })
    }

}
