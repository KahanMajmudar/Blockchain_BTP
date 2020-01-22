const mongoose = require('mongoose');
const express = require('express');
const home = require('./routes/homepage');
const quiz = require('./routes/quiz_routes')
const user = require('./routes/user_routes');
const mail = require('./routes/mail_routes');
const auth = require('./routes/auth_routes');
const app = express();
const helmet = require('helmet');   

app.use(express.json());                            
app.use(express.urlencoded({ extended: true }));          
app.use(helmet());
app.use('/', home);
app.use('/api/quiz', quiz);
app.use('/api/user', user);
app.use('/api/mail', mail);
app.use('/api/auth', auth);


mongoose.connect('mongodb://localhost/myquiz', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Connection established succesfully!!'))
    .catch(err => console.error('Failed to establish connection', err));

app.listen(3000, () => console.log('Listening on port 3000...'));