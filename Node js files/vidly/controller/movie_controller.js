const { Movie, validate } = require('../model/movie_model');
const { Genre } = require('../model/genre_model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);


exports.view = async (req, res) => {

    const found = await Movie.find().sort('name');
    return res.status(200).send(found);

}

exports.read = async (req, res) => {

    const found = await Movie.findById(req.params.id);
    if(!found){
        return res.status(404).send('ID Not found!!')
    }

    return res.status(200).send(found);

}

exports.create = async (req, res) => {

    const {error} = validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }

    const found = await Genre.findById(req.body.genreID);
    if(!found){
        return res.status(404).send('ID Not found!!')
    }

    const movie = new Movie({
        name: req.body.name,
        genre: {
            _id: found.id,
            name: found.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    const result = await movie.save();
    res.send(result);

}

exports.update = async (req, res) => {

    const {error} = validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }

    const found = await Movie.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});

    if(!found){
        return res.status(404).send('Movie doesn\'t exist');
    }
    res.send(found);

}

exports.delete = async (req, res) => {

    const found = await Movie.findByIdAndDelete(req.params.id);
     if(!found){
        return res.status(404).send('Movie doesn\'t exist');
     }
     res.send(found);
 
 }