const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { User, validate } = require('../model/user_model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


exports.view = async (req, res) => {

    const found = await User.find().sort('-name');
    return res.status(200).send(found); 

}
/*
exports.me = async (req, res) => {

    console.log(req.user._id)
    const found = await User.findById(req.user._id);
    if(!found){
        return res.status(404).send('ID Not found!!')
    }
    console.log(found)
    return res.status(200).send(found); 

}
*/
exports.read = async (req, res) => {

    const valid = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!valid){
        return res.send('Object ID is not valid!!');
    }

    const found = await User.findOne(req.params.id);
    if(!found){
        return res.status(404).send('ID Not found!!')
    }

    return res.status(200).send(found);

}

exports.create = async (req, res) => {

    const {error} = validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(404).send('User already exist!!')
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id','name', 'email']));
 
}