const express = require('express');
const auth_controller = require('../controller//auth_controller');

const router = express.Router();


router.post('/login', auth_controller.login);


module.exports = router;