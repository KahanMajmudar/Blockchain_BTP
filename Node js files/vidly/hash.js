const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function run(){
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('password', salt)
    console.log(salt)
    console.log(pass)
}

run()

const token = jwt.sign({id: 'user_id'}, 'secret key');

console.log(token)

const decoded = jwt.verify(token, 'secret key');

console.log(decoded.id)