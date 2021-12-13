const jwt = require('jsonwebtoken');
const Authentication = require('./auth')

// User login
const requireLogin = (req, res, next) => {

    try {
        
        const token = req.cookies.access_token

        const auth = new Authentication()
        var data = auth.verifyToken(token)

        if (data && data.role == 'admin') {
            console.log("Logged in!!")
            next();
        } else {
            res.status(401).redirect('/login')
        }
        
    }catch(err){
        res.status(500).json({"message" : "Internal server error" , "err" : err })
    }
    
    
}

module.exports = requireLogin;