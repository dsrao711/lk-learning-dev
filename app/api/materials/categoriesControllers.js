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

exports.addCategory= async function(req , res){

    category_name = req.body.category_name
    material_id = req.body.material_id

    var sql_statement = `
        INSERT INTO 
            category(category_name , material_id)
            VALUES(?,?)
    `
    var users_input = [
        category_name , 
        material_id
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
            .redirect(`/materials/plans/${material_id}`)
        })
    }catch(err){
        console.log(err)
        res
        .status(500)
        .json({ "message": "Internal server error!" , "Error" : err })
    }

}

exports.deleteCategory= async function(req , res){

    console.log(req.body)
    category_id = req.body.category_id
    material_id = req.body.material_id

    var sql_statement = `
        DELETE from category
        WHERE category_id = ?
    `
    var users_input = [
        category_id
    ]

    try{
        mySqlConnection.query(sql_statement, users_input, (err, rows) => {
            if (err) {
                console.log(err)
                res.status(400).send("failed!!!")
            }
            console.log("deleted!")
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


