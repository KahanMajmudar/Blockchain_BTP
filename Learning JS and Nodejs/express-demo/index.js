const express = require('express');
//const config = require('config');
// const logger = require('./logger');
// const authenticate = require('./authenticator');
const Joi = require('@hapi/joi');
const app = express();
app.use(express.json());                            //populates req.body
app.use(express.urlencoded({ extended: true }));    //use to parse forms with key=value&key=value...
app.use(express.static('public'));                  //serve static assests -> opens from root
// app.use(logger);
// app.use(authenticate);

//3rd party middleware
const helmet = require('helmet');                   //secure Express apps by setting various HTTP headers
const morgan = require('morgan');                   //log requests -> can affect performance

app.use(helmet());
app.use(morgan('tiny'));

// process.env.NODE_ENV                             //returns environment type -> if not set, undefined, Development, Production, Testing etc
// app.get('env')                                   //returns environment type -> Development by default

// const appDebugger = require('debug')('app: start');
//then use appDebuger('message');


/*
POST == CREATE
GET == READ
PUT == UPDATE
DELETE == DELETE
*/


let courses = [

    {id: 1, name: 'Learn JS'},
    {id: 2, name: 'Learn Node'},
    {id: 3, name: 'Learn Solidity'}

];

function validateCourse(course){

    const schema = Joi.object({

        name: Joi.string().min(3).required()

    });

    return schema.validate(course);
    // console.log(valid);

}


app.get('/', (req, res) => {

    res.send('Hello World');

});

/*
app.get('/api/posts/:id', (req, res) => {

    res.send(req.params.id);    eg -> /:year/:month
    res.send(req.query);        after ?key=value

});*/

app.get('/api/courses', (req, res) => {

    res.send(courses);

});

app.get('/api/courses/:id', (req, res) => {

    const found = courses.find(key => key.id === parseInt(req.params.id));
    //console.log(found);

    if(!found){

        return res.status(404).send('Course doesnot exist');

    }
    res.send(found);

});


app.post('/api/courses', (req, res) => {

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    const {error} = validateCourse(req.body);

    if(error){

        return res.send(error.details[0].message);

    }
    courses.push(course);
    res.send(course);

});

app.put('/api/courses/:id', (req, res) => {

    const found = courses.find(key => key.id === parseInt(req.params.id));

    if(!found){

        return res.status(404).send('Course doesnot exist');

    }

    const {error} = validateCourse(req.body);
    if(error){

        return res.send(error.details[0].message);

    }

    found.name = req.body.name;
    res.send(found);

});

app.delete('/api/courses/:id', (req, res) => {

    const found = courses.find(key => key.id === parseInt(req.params.id));

    if(!found){

        return res.status(404).send('Course doesnot exist');

    }

    const index = courses.indexOf(found);
    courses.splice(index,1);
    res.send(found);

})


// port = process.env.port;
app.listen(3000, () => console.log('Listening on port 3000...'));