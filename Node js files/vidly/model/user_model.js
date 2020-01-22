const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Joi = require('@hapi/joi');
// const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 20
    }, 

    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },

    password: {
        type: String,
        select: false,
        trim: true,
        minlength: 5,
        maxlength: 1024
    },

    isAdmin: {
        type: Boolean,
        default: false
    }

})  

const User = mongoose.model('User', userSchema);

//Information Expert Principle
//userSchema.methods.getAuthToken = function() {
   
    // console.log('auth token func',{user_id: mongoose.Types.ObjectId(id) })
    // console.log('auth token func with this',{user_id: mongoose.Types.ObjectId(this._id) })
    // const token = jwt.sign({id: mongoose.Types.ObjectId(this._id)}, 'SecretKey');
    // return token;
//}


userSchema.methods.generateAuthToken = function() {

    console.log({userID: this._id});

}




function validateUser(user){

    const schema = Joi.object({

        name: Joi.string().min(5).max(20).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(1024).required()

    });
    return schema.validate(user);

}

module.exports.User = User;
module.exports.validate = validateUser;


