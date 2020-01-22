const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const { User } = require('../model/user_model');
const { validate } = require('../model/auth_model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


exports.login = async (req, res) => {

    const {error} = validate(req.body);
    if(error) return res.send(error.details[0].message);

    const found = await User.findOne({email: req.body.email}).select('+password');
    if(!found) return res.status(404).send('Email doesn\'t exist!!')

    const passValid = await bcrypt.compare(req.body.password, found.password);
    if(!passValid) return res.status(400).send('Invalid Password, Try again!!');

    const token = found.schema.methods.generateAuthToken();
    res.header('x-auth-token',token).send('Login Successful!!');

}