const jwt = require('jsonwebtoken');

module.exports.genAuthToken = function(payload) {
   
    const token = jwt.sign(payload, 'SecretKey');
    return token;

}
