
const mysqlConnection = require('../../config/connection')
var getStates = require('../utils/getStates')
var getDistricts = require('../utils/getDistricts')
var getCities = require('../utils/getCity')
var getUniversities = require('../utils/getUniversity')
var getColleges = require('../utils/getCollege')
var getCourses = require('../utils/getCourses')
var getBranches = require('../utils/getBranches')
var getSemesters = require('../utils/getSem')

// Admin panel 
exports.authorsPage = async function(req, res) {

    const states = await getStates()
    const districts = await getDistricts()
    const cities = await getCities()
    const colleges = await getColleges()

    var sql_statement = `
        SELECT 
            a.author_id, a.author_name , a.author_email ,
            a.author_mobile , a.author_designation , 
            c.college_name , s.state_title , 
            d.district_title , ct.name 
        FROM author as a
        JOIN college as c ON c.college_id = a.college_id
        JOIN state as s ON s.state_id = a.state_id
        JOIN district as d ON d.districtid = a.districtid
        JOIN city as ct ON ct.id = a.city_id
    `
    try{
        mysqlConnection.query(sql_statement , (err  ,rows) => {
            if(!err){
                res.status(200).render('authors/authors.ejs' , {
                    data : rows ,
                    states : states , 
                    districts : districts , 
                    cities : cities, 
                    colleges : colleges 
                })
            }else{
                res.json({"error" : err})
            }
        })
    }catch(e){
        res.status(500).json({"Message" : "Internal server error" , "error" : e})
    }

}

exports.addAuthor = async function(req, res) {
  
    author_name = req.body.author_name
    author_email = req.body.author_email
    author_mobile = req.body.author_mobile
    college_id = req.body.college_id
    author_designation = req.body.author_designation
    state_id = req.body.state_id
    district_id = req.body.district_id
    taluka_id = req.body.taluka_id
    
    var sql_statement = `
        INSERT INTO 
            author(
                author_name , 
                author_email , 
                author_mobile ,
                college_id , 
                author_designation ,
                state_id , 
                districtid , 
                city_id 
            )
        VALUES(?,?,?,?,?,?,?,?)
    `
    var input = [
        author_name,
        author_email,
        author_mobile,
        college_id,
        author_designation,
        state_id,
        district_id,
        taluka_id
    ]
    
    try{
        mysqlConnection.query(sql_statement , input ,(err  ,rows) => {
            if(!err){
               
                res.status(200).redirect('/authors')
            }else{
                res.json({"error" : err})
            }
        })
    }catch(e){
        res.status(500).json({"Message" : "Internal server error" , "error" : e})
    }

}


exports.editAuthors = async function(req, res){

    console.log("request body ...")
    console.log(req.body)

    var sql_statement = `
        UPDATE author 
            SET author_name = ? , 
                author_mobile = ? ,
                author_email = ? ,
                state_id = ? , 
                districtid = ? ,
                city_id = ? ,
                college_id = ? , 
                author_designation = ?
        WHERE author_id = ? 
    `

    var input = [
        req.body.author_name , 
        req.body.author_mobile , 
        req.body.author_email , 
        req.body.state_id , 
        req.body.district_id , 
        req.body.taluka_id , 
        req.body.college_id , 
        req.body.author_designation , 
        req.body.author_id 
    ]
    console.log("input here ...")
    console.log(input)
    try{
        mysqlConnection.query(sql_statement , input,  (err  ,rows) => {
            if(!err){
                console.log("Edited!!")
                res.status(200).redirect('/authors')
            }else{
                res.json({"error" : err})
            }
        })
    }catch(e){
        res.status(500).json({"Message" : "Internal server error" , "error" : e})
    }
}

exports.deleteAuthor = async function(req, res){
    id = req.params.id
    console.log(id)
    var sql_statement = `
        DELETE from author
        WHERE author_id = ?
    `
    try {
        mysqlConnection.query(sql_statement, [id], (err, rows) => {
            if (err) {
                res.send(err)
            }
            console.log("DELETED")
            res
            .status(200)
            .redirect('/authors')
        })
    } catch (err) {
        res
            .status(500)
            .json({ "message": "Internal server error!" })
    }

}
// APIS
// get authors api 
exports.getAuthors = function(req , res) {

    mysqlConnection.query('SELECT * from author' , (err  ,rows , fields ) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(fields)
        }
    })

}

