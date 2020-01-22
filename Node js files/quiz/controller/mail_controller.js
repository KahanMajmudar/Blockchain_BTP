const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const _ = require('lodash')
const { User } = require('../model/user_model');



let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: 'e4bddf076f94ee',
        pass: 'b3692275fe58c9'
  }
});

module.exports.verifiedMailSender = async function (token, email){

    try {
        
        const url = `http://localhost:3000/api/mail/confirm/${token}`;
        
        transporter.sendMail({
            to: email,
            from: 'quiz.test@mail.com',
            subject: 'Confirm Mail',
            html: `Please click this url to confirm your email: <a href="${url}">${url}</a>`
    })    

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
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
        // var tr;
        // for (var i = 0; i < result.length; i++) {
        //     tr = $('<tr/>');
        //     tr.append("<td>" + json[i].Question + "</td>");
        //     tr.append("<td>" + json[i].Answer + "</td>");
        //     $('table').append(tr);
        // }

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