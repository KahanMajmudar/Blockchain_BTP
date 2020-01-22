const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

app.listen(3000, () => {

    console.log('Listening on port 3000');

});
