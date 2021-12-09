
const mysqlConnection = require('../../config/connection')

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

// Authors page - admin panel 
exports.authorsPage = function(req, res) {
    res.render('authors/authors.ejs')
}
