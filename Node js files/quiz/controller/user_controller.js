import { User, validate } from '../model/user_model'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import mailer from '../controller/mail_controller'
import auth from '../middleware/auth_middleware'

exports.viewUser =  async (req, res) => {

    const result = await User.find({}).select('+name');

    if(!result) return res.send(404).send('No documents found!!')

    res.send(result);

}

exports.viewUserid = async (req, res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send('ID Not valid!!')
        }

        const result = await User.findById(req.params.id);

        if(!result) return res.status(404).send('User not found!!');

        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

}

exports.createUser  = async (req, res) =>{

    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(404).send('User already exist!!')
        }

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const payload = _.pick(user, ['_id'])
        const token = auth.genAuthToken(payload);
        const data = {name: user.name,
            email: user.email,
            token: token
        }

        mailer.verifiedMailSender(data);
        res.status(201).send(_.pick(user, ['_id','name', 'email']));


    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }


}

exports.updateUser = async (req, res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send('ID Not valid!!')
        }

        const result = await User.findByIdAndUpdate(req.params.id, {
            $set: _.pick(req.body, ['name', 'email', 'password'])
        }, { new: true })

        if(!result) return res.status(404).send('ID doesn\'t exist!!')

        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

exports.deleteUser = async (req, res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send('ID Not valid!!')
        }

        const result = await User.findByIdAndDelete(req.params.id);

        if(!result) return res.status(200).send('ID doesn\'t exist!!');

        res.status(404).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}



