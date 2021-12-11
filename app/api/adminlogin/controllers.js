require('dotenv').config()
// admin panel login 

exports.loginPage = function(req , res) {
    res.render('login.ejs')
}

exports.loginAdmin = function(req,res){
    console.log(req.body.username)

    try{
        // form input
        var admin_username = req.body.username
        var admin_password = req.body.password

        if(!(admin_username && admin_password)){
            res.send("Jjdfiefi")
        }

        if(admin_username == process.env.ADMIN_USERNAME && admin_password == process.env.ADMIN_PASSWORD){
            res.status(200).json({"message" : "admin logged in !!"})
        }else{
            res.staus(401).json({"message" : "Unauthorized access"})
        }

    }catch(err){
        res.status(500).json({"message" : "Internal server error"})
    }    

}