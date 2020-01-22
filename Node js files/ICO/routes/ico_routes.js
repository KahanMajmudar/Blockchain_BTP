const app = require('express');
const router = app.Router();
const ico_controller = require('../controller/ico_controller');


router.post('/buytokens', ico_controller.buyTokens)


module.exports = router