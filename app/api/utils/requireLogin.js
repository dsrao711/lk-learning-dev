const jwt = require('jsonwebtoken');
const Authentication = require('./auth')

// User login
const requireLogin = (req, res, next) => {

    try {
        const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const auth = new Authentication()
        var data = auth.verifyToken(token)

        if (data && data.role == 'student') {
            req.data = data.id
            next();
        } else {
            res.status(401).json({ "message": "Unauthorized access" })
        }
        
    }catch(err){
        res.status(500).json({"message" : "Internal server error" , "err" : err })
    }
    
    
}

module.exports = requireLogin;