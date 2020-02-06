import jwt from 'jsonwebtoken'

exports.admin = async function(req, res, next){

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Token not Provided!!')

    const user = jwt.verify(token, 'SecretKey');

    if(!user.isAdmin) return res.status(403).send('Forbidden!!');
    next();

}