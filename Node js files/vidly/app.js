require('express-async-errors');
const error_handling = require('./middleware/error_middleware');
const express = require('express');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const home = require('./routes/homepage');
const genres = require('./routes/genres_routes');
const customers = require('./routes/customers_routes');
const movies = require('./routes/movies_routes');
const rentals = require('./routes/rentals_routes');
const users = require('./routes/users_routes');
const auths = require('./routes/auths_routes');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');                   

app.use(express.json());                            
app.use(express.urlencoded({ extended: true }));    
app.use(express.static('public'));  
app.use(helmet());

app.use('/', home);
app.use('/api/auths', auths);
app.use('/api/genres', genres);  
app.use('/api/customers', customers);    
app.use('/api/movies', movies); 
app.use('/api/rentals', rentals); 
app.use('/api/users', users);  

app.use(error_handling.error);

mongoose.connect('mongodb://localhost/vidly-app', { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(console.log('Connection Successful!!'))
    .catch(err => {console.log("Error", err)})

app.listen(3000, () => {

    console.log('Listening on port 3000');

});