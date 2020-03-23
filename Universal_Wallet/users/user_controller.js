import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import _ from 'lodash'
import { User, validate } from './user_model'
import { Auth } from '../api/middlewares/auth'
import { MailController } from  '../mail/mail_controller'


export class UserController {

    constructor() {

        this.user
        this.User = User
        this.Auth = new Auth()
        this.Mailer = new MailController()

    }

    viewUser =  async () => {

        const result = await this.User.find({}).select('+name')

        if(!result) return ('No documents found!!')

        return result

    }

    viewUserid = async (userId) => {

        try {
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return ('ID Not valid!!')
            }

            const result = await this.User.findById(userId);

            if(!result) return ('User not found!!');

            console.log(result)

            return result

        } catch (error) {
            console.log(error)
        }
    }

    createUser  = async(userObject) =>{

        try {
            const { error } =  validate(userObject);
            if(error) return (error.details[0].message);

            let User = await this.User.findOne({email: userObject.email});
            if(User){
                return ('User already exist!!')
            }

            this.user = new this.User(_.pick(userObject, ['name', 'email', 'password']));
            console.log(this.user)

            const salt = await bcrypt.genSalt(10);
            this.user.password = await bcrypt.hash(this.user.password, salt);
            await this.user.save();
            const result = _.pick(this.user, ['_id','name', 'email'])

            const payload = _.pick(this.user, ['_id'])
            const token = this.Auth.genAuthToken(payload);
            const data = {
                name: this.user.name,
                email: this.user.email,
                token: token
            }

            this.Mailer.verificationMailSender(data)

            console.log(result)

            return result


        } catch (error) {
            console.log(error)
            // res.status(500).send(error);
        }


    }

    updateUser = async (userId, userObject) => {

        try {
            if(!mongoose.Types.ObjectId.isValid(userId)){
                return ('ID Not valid!!')
            }

            const salt = await bcrypt.genSalt(10);
            userObject.password = await bcrypt.hash(userObject.password, salt);

            const result = await this.User.findByIdAndUpdate(userId, {
                $set: _.pick(userObject, ['name', 'email', 'password'])
            }, { new: true })

            if(!result) return ('ID doesn\'t exist!!')

            console.log(result)

            return result

        } catch (error) {
            console.log(error);
        }

    }

    deleteUser = async (userId) => {

        try {
            if(!mongoose.Types.ObjectId.isValid(userId)){
               return('ID Not valid!!')
            }

            const result = await this.User.findByIdAndDelete(userId);

            if(!result) return ('ID doesn\'t exist!!');

            console.log(result);

            return result

        } catch (error) {
            console.log(error);
        }

    }

}