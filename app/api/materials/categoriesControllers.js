const mySqlConnection = require('../../config/connection')

exports.editCategory= async function(req , res){

    console.log("heerre.....")
    category_id = req.params.id
    category_name = req.body.category_name
    
    var sql_statement = "UPDATE category SET category_name = ? WHERE category_id = ?"
    var users_input = [
        category_name , 
        category_id
    ]

    try{
        mySqlConnection.query(sql_statement, users_input, (err, rows) => {
            if (err) {
                console.log(err)
                res.status(400).send("failed!!!")
            }
            console.log("UDPATED")
            res
            .status(200)
            .redirect(`/materials`)
        })
    }catch(err){
        console.log(err)
        res
        .status(500)
        .json({ "message": "Internal server error!" , "Error" : err })
    }

}
