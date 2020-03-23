import jwt from 'jsonwebtoken'

export class Auth {

    genAuthToken = function(payload) {

        const token = jwt.sign(payload, 'SecretKey');
        return token;

    }

}