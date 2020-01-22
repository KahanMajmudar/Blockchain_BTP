const { Customer, validate } = require('../model/customer_model');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

exports.view = async (req, res) => {

    const found = await Customer.find().sort('name');
    return res.status(200).send(found);

}

exports.read = async (req, res) => {

    const found = await Customer.findById(req.params.id);
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
    
    const cust = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    const result = await cust.save();
    res.send(result);

}

exports.update = async (req, res) => {

    const {error} = validate(req.body);
    if(error){
        return res.send(error.details[0].message);
    }

    const found = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});

    if(!found){
        return res.status(404).send('Customer doesn\'t exist');
    }
    res.send(found);

}

exports.delete = async (req, res) => {

    const found = await Customer.findByIdAndDelete(req.params.id);
     if(!found){
         return res.status(404).send('Customer doesn\'t exist');
     }
     res.send(found);
 
 }