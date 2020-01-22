const bcrypt = require('bcryptjs');
const { User } = require('../model/user_model');
const { validate } = require('../model/auth_model');
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);



exports.login = async (req, res) => {

    const {error} = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const user = await User.findOne({email: req.body.email}).select('+password');
    if(!user) return res.status(404).send('Email doesn\'t exist!!')

    const passValid = await bcrypt.compare(req.body.password, user.password);
    if(!passValid) return res.status(400).send('Invalid Password, Try again!!');

    if(!user.isVerified) return res.status(400).send('Please confirm your email!!')

    payload = _.pick(user, ['id', 'isAdmin', 'isVerified'])
    token = jwt.sign(payload, 'SecretKey');
    res.status(200).header('x-auth-token', token).send('Login Successful!!');
 
}