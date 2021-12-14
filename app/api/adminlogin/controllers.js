require('dotenv').config()
const Authentication = require('../utils/auth')
// admin panel login 

exports.loginPage = function (req, res) {
    res.render('login.ejs')
}

exports.loginAdmin = function (req, res) {
    console.log(req.body.username)

    // Match id pwd
    // create access token 
    // Store in cookies

    try {
        // form input
        var admin_username = req.body.username
        var admin_password = req.body.password
        
        // Create access token 
        data = {
            role: 'admin',
            user_name: admin_username
        }

        const auth = new Authentication();
        token = auth.createToken(data)
        console.log(token)

        if (admin_username == process.env.ADMIN_USERNAME && admin_password == process.env.ADMIN_PASSWORD) {
            res
            .status(200)
            .cookie("access_token", token, {httpOnly: true})
            .redirect('/')  
              
        } else {
            res.staus(401).json({ "message": "Unauthorized access" })
        }

    } catch (err) {
        res.status(500).json({ "message": "Internal server error" })
    }

}

exports.logout = function(req , res){
    res.clearCookie('jwt');
    res.redirect('/login')
}