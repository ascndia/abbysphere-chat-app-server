const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const jwttoken = authHeader && authHeader.split(' ')[1];
    if(!jwttoken) return res.json({msg:'no token'});
    jwt.verify(jwttoken,process.env.secretkey,(err,decoded)=>{
        if(err){
            return res.json({msg:'error invalid token'});
        } else {
            req.body.userid = decoded.userid
            req.body.username = decoded.username
            req.body.email = decoded.email;
            next();
        }
    })
    
}

module.exports = jwtAuthMiddleware