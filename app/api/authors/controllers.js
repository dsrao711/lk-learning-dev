
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

    try{
        mysqlConnection.query('SELECT * from author' , (err  ,rows , fields ) => {
            if(!err){
                res.status(200).render('authors/authors.ejs' , {data : rows})
            }else{
                res.send(fields)
            }
        })
    }catch(e){
        res.status(500).send("Internal server error")
    }
    res.render('authors/authors.ejs')
}
