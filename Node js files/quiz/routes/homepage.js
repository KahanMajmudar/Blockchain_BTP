const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.send('Welcome to our Website');

});

module.exports = router;