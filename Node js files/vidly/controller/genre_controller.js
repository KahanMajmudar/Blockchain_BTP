const { Genre, validate } = require('../model/genre_model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

exports.view = async (req, res) => {

    const found = await Genre.find().sort('name');
    return res.status(200).send(found);

}

exports.read = async (req, res) => {

    const found = await Genre.findById(req.params.id);
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
    
    const genre = new Genre({
        name: req.body.name
    });
    
    const result = await genre.save();
    res.send(result);

}

exports.update = async (req, res) => {

    const {error} = validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }

    const found = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});

    if(!found){
        return res.status(404).send('Genre doesn\'t exist');
    }
    res.send(found);

}

exports.delete = async (req, res) => {

    const found = await Genre.findByIdAndDelete(req.params.id);
     if(!found){
         return res.status(404).send('Genre doesn\'t exist');
     }
     res.send(found);
 
 }