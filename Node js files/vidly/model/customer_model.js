const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const customerSchema = mongoose.Schema({

    name: {
        type: String, 
        required: true, 
        trim: true,
        minlength: 5, 
        maxlength: 50},
        
    phone: {
        type: String, 
        required: true, 
        trim: true,
        minlength: 10, 
        maxlength: 10},
    
    isGold: {
        type: Boolean, 
        default: false}

})

const Customer = mongoose.model('Customer', customerSchema);

function validateCust(cust){

    const schema = Joi.object({

        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.bool()
        
    });
    return schema.validate(cust);

}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validate = validateCust;
