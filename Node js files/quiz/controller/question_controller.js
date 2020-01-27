import { Quiz, validate } from '../model/quiz_model'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import mailer from '../controller/mail_controller'

exports.view =  async (req, res) => {

    const result = await Quiz.find({}).select('+ans');

    if(!result) return res.send(404).send('No documents found!!')

    res.send(result);

}

exports.viewQuiz = async (req, res) => {

    const result = await Quiz.find({});

    if(!result) return res.send(404).send('No documents found!!')

    res.send(result);

}

exports.viewQuestion = async (req, res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send('ID Not valid!!')
        }

        const result = await Quiz.findById(req.params.id);

        if(!result) return res.status(404).send('Document not found!!');

        res.status(200).send(result);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }

}

exports.createQuestion  = async (req, res) =>{

    try {
        const { error } = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const question = new Quiz({

            ques: req.body.ques,
            options: req.body.options,
            ans: req.body.ans,
            marks: req.body.marks

        });

        const result = await question.save();
        res.status(201).send(result);

    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }


}

exports.updateQuestion = async (req, res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send('ID Not valid!!')
        }

        const result = await Quiz.findByIdAndUpdate(req.params.id, {
            $set: {
                ques: req.body.ques,
                options: req.body.options,
                ans: req.body.ans,
                marks: req.body.marks
            }
        }, { new: true })

        if(!result) return res.status(404).send('ID doesn\'t exist!!')

        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

exports.deleteQuestion = async (req, res) => {

    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.send('ID Not valid!!')
        }

        const result = await Quiz.findByIdAndDelete(req.params.id);

        if(!result) return res.status(200).send('ID doesn\'t exist!!');

        res.status(404).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}


exports.sendAnswers = async (req, res) => {

    try {

        const token = req.header('x-auth-token');
        payload = jwt.verify(token, 'SecretKey');
        email = payload.email;
        result = req.body;
        console.log(result)
        mailer.sendAnswers(result, email);
        res.status(200).send('Received!');

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}