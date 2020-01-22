const app = require('express');
const router = app.Router();
const token_controller = require('../controller/token_controller');


router.get('/info', token_controller.info);

module.exports = router