import jwt from 'jsonwebtoken'

module.exports.genAuthToken = function(payload) {

    const token = jwt.sign(payload, 'SecretKey');
    return token;

}
