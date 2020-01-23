const express = require('express');
const app = express();
const helmet = require('helmet');
const wallet = require('./routes/wallet_routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/wallet', wallet)

app.listen(3000, () => {

    console.log('Listening on port 3000');

});