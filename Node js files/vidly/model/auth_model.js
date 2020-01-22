const Joi = require('@hapi/joi');

function validateUser(user){

    const schema = Joi.object({

        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(1024).required()

    });
    return schema.validate(user);

}

module.exports.validate = validateUser;
