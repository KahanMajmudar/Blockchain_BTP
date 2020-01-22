const { Movie } = require('../model/movie_model');
const { Customer } = require('../model/customer_model');
const { Rental, validate } = require('../model/rental_model');
const mongoose = require('mongoose');
const Fawn = require('fawn');
Fawn.init(mongoose);
mongoose.set('useFindAndModify', false);


exports.view = async (req, res) => {

    const found = await Rental.find().sort('-dateOut');
    return res.status(200).send(found); 

}

exports.read = async (req, res) => {

    const found = await Rental.findById(req.params.id);
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

    const movie = await Movie.findById(req.body.movieID);
    if(!movie){
        return res.status(404).send('Movie ID Not found!!')
    }

    const cust = await Customer.findById(req.body.custID);
    if(!cust){
        return res.status(404).send('Customer ID Not found!!')
    }

    if (movie.numberInStock === 0) return res.status(400).send('Out of stock!!');

    const rental = new Rental({

        customer: {
            _id: cust.id,
            name: cust.name,
            phone: cust.phone,
            isGold: cust.isGold
        },
        movie: {
            _id: movie.id,
            name: movie.name,
            genre: movie.genre,
            rental: movie.dailyRentalRate
        }
        
    });
    
    try {

        new Fawn.Task()
            .save('rentals', rentals)
            .update('movies', {_id: movie._id}, {
                $inc: {numberInStock: -1}
            })
            .run();
        res.send(rental);

    } 
    catch (error) {
        res.status(500).send(error);
    }

}

/*
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
*/

