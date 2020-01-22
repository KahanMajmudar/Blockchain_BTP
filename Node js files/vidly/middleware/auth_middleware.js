const jwt = require('jsonwebtoken');

exports.auth = function(req, res, next){

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Acess denied!! Please provide a token...');

    try {
        decoded_payload = jwt.verify(token, 'SecretKey'); 
        req.user = decoded_payload;                         //req.user._id will give us the this._id  
        next();
    } catch (error) {
        return res.status(400).send('Invalid Token!!');    
    }
    
}

