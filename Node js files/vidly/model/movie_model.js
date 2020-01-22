const mongoose = require('mongoose');
const { genreSchema } = require('./genre_model');
const Joi = require('@hapi/joi');

const movieSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    genre: {
        type: genreSchema,
        required: true
    },

    numberInStock: {
        type: Number,
        required: true,
        min: 0
    }, 

    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
    }

})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie){

    const schema = Joi.object({

        name: Joi.string().min(5).max(50).required(),
        genreID: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()

    });
    return schema.validate(movie);

}

module.exports.movieSchema = movieSchema;
module.exports.Movie = Movie;
module.exports.validate = validateMovie;


