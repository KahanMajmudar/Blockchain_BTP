const jwt = require('jsonwebtoken');

exports.verified_user = async function(req, res, next){

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('No token provided');    

    const user = await jwt.verify(token, 'SecretKey');
    
    if(!user.isVerified) return res.status(401).send('Verify Email!!');
    next();
   
}