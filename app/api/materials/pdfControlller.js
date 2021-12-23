const mySqlConnection = require('../../config/connection')
const multer = require('multer')


exports.uploadPdfs= async function(req , res){
    console.log(req.body)
    console.log(req.file)
    const file_path = req.file.file_path
    const file_name = req.file.originalname
    
    // Insert cat_id , 

}