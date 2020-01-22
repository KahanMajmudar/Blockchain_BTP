const mongoose = require('mongoose');
const Joi = require("@hapi/joi");

const quizSchema = mongoose.Schema({

    ques: String,
    options: [mongoose.Schema.Types.Mixed],
    ans: { type: mongoose.Schema.Types.Mixed, select: false },
    marks: { type: Number, min: 1, max: 4 },
    date: { type: Date, default: Date.now }

}, { retainKeyOrder: true });

const Quiz = mongoose.model('Quiz', quizSchema);


function validateQuiz(quiz){

    const schema = Joi.object({

        ques: Joi.string().min(5).required(),
        options: Joi.array().items(Joi.object()).length(4).required(),
        ans: Joi.object().required(),
        marks: Joi.number().min(1).max(4).positive().required()
    });

    return schema.validate(quiz);

}

exports.Quiz = Quiz
exports.validate = validateQuiz;