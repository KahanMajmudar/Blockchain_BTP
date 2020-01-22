const app = require('express');
const router = app.Router();
const auth_controller = require('../controller/auth_controller');
const verified_user = require('../middleware/user_middleware')


router.post('/login', auth_controller.login);

module.exports = router