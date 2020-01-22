const app = require('express');
const router = app.Router();
const acc_controller = require('../controller/account_controller');


router.post('/send', acc_controller.sendEthSigned)


module.exports = router