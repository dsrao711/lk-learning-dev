var jwt = require('jsonwebtoken');

class Authentication {

    constructor(){
        this.secret_key = process.env.SECRET_KEY || "secret"
    }

    createToken(data){
        const payload = {
            sub  : data, 
            iat: Date.now()
        }
        const token = jwt.sign(payload , this.secret_key , { expiresIn : 5*24*60*60 })
        return token
    }

    verifyToken(token){
        try{
            var data = jwt.verify(token , this.secret_key);
            return data.sub
        }catch(err){
            return null
        }
    }

}

module.exports = Authentication;