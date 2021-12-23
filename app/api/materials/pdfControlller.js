const mySqlConnection = require('../../config/connection')
const multer = require('multer')


exports.uploadPdfs= async function(req , res){

    var pdf_name = req.file['originalname']
    var pdf_link = `http://94.130.8.49:3000/pdf/${pdf_name}`
    var topic_id = req.body.topic_id
    var material_id = req.body.material_id

    var sql_statement =    `
        INSERT into 
            pdf(pdf_name , pdf_link , topic_id)
            VALUES(?,?,?)
    `
    var user_input = [pdf_name , pdf_link , topic_id]
    try{
        mySqlConnection.query(sql_statement, user_input, (err, rows) => {
            if (err) {
                console.log(err)
                res.status(400).send("failed!!!")
            }
            console.log("UDPATED")
            res
            .status(200)
            .redirect(`/materials/plans/${material_id}`)
        })
    }catch(err){
        console.log(err)
        res
        .status(500)
        .json({ "message": "Internal server error!" , "Error" : err })
    }


}