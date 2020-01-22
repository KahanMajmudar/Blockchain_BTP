const express = require('express');
const user_controller = require('../controller/user_controller');
const auth = require('../middleware/auth_middleware')

const router = express.Router();


router.get('/view', user_controller.view);

router.get('/read/:id', user_controller.read);

router.post('/create', user_controller.create);

// router.post('/me', auth.auth, user_controller.me);


module.exports = router;