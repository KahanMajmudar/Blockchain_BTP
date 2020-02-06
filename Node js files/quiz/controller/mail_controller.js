import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import Handlebars from 'handlebars'
import { promises as fs } from 'fs';
import path from 'path'
import _  from 'lodash'
import { User } from '../model/user_model'



let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: 'my key',
        pass: 'my key'
  }
});


module.exports.verifiedMailSender = async function (data){

    try {

        const token = data.token
        const name = data.name
        const email = data.email
        const url = `http://localhost:3000/api/mail/confirm/${token}`;

        const hbs_file = await fs.readFile(path.resolve(__dirname, '../views/verification_mail.hbs'), {encoding: 'utf-8'})
        const template = Handlebars.compile(hbs_file)
        const updated_template = template({
            name: name,
            url: url
        })


        transporter.sendMail({
            to: email,
            from: 'quiz.test@mail.com',
            subject: 'Confirm Mail',
            html: updated_template
    })

    } catch (error) {
        console.log(error);
    }
}


exports.confirm = async function(req, res){

    try {

        const user = jwt.verify(req.params.token, 'SecretKey');
        const user_ID = user._id;
        const found_user = await User.findById(user_ID);
        if(!found_user) return res.status(400).send('Verification not successfull!!');

        await User.findByIdAndUpdate(user_ID, {
            $set: { isVerified: true }
        }, { new: true })

        // payload = _.pick(updated_user, ['_id', 'isAdmin', 'isVerified'])
        // token = jwt.sign(payload, 'SecretKey');
        // tokenMailSender(token, email);

        res.redirect('http://localhost:3000/');

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.sendAnswers = async function(result, email){

    try {

        result = JSON.stringify(result, null, 10);

        transporter.sendMail({
            to: email,
            from: 'quiz.test@mail.com',
            subject: 'Your Response',
            html: `Your responses are: ${result}`
    })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


/*
async function tokenMailSender(token, email){

    try {

        transporter.sendMail({
            to: email,
            from: 'quiz.test@mail.com',
            subject: 'Thanks For Verifying',
            html: `Your token is:-> ${token}, use it during login`
    })

    } catch (error) {
        console.log(error);
    }
}
*/