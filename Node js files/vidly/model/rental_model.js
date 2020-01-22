const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { customerSchema } = require('./customer_model');
const { movieSchema } = require('./movie_model');


const rentalSchema = mongoose.Schema({

    customer: {
        type: customerSchema,
        required: true
    }, 

    movie: {
        type: movieSchema,
        required: true
    },

    dateOut: {
        type: Date,
        default: Date.now
    },

    dateIn: {
        type: Date
    },

    rentalFee: {
        type: Number,
        min: 0
    }

})

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental){

    const schema = Joi.object({

        custID: Joi.objectId().required(),
        movieID: Joi.objectId().required(),

    });
    return schema.validate(rental);

}

module.exports.Rental = Rental;
module.exports.validate = validateRental;


