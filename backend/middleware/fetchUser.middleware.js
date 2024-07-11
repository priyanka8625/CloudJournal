const jwt = require('jsonwebtoken')

const fetchUser = async (req, res, next)=>{
    //get user using req's JWT access token
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{
        const tokenData = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = tokenData.user;
        next()
    }catch(error){
        return res.status(401).send({error: "Please authenticate using a valid token"})
    }
    
}

module.exports = fetchUser;