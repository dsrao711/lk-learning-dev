const jwt = require('jsonwebtoken') ;


const requireLogin = (req , res , next) => {

    const token  = req.body.token || req.query.token || req.headers["x-access-token"];
}

module.exports = requireLogin;