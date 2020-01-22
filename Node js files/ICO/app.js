const express = require('express');
const app = express();
const helmet = require('helmet');

const token = require('./routes/token_routes')
const ico = require('./routes/ico_routes')
const account = require('./routes/account_routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/api/token', token)
app.use('/api/ico', ico)
app.use('/api/account', account)


app.listen(3000, () => console.log('Listening on port 3000...'));

