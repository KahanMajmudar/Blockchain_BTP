const app = require('express');
const router = app.Router();
const wallet = require('../controller/wallet_controller');


router.post('/createWallet', wallet.create);

router.get('/getWallet', wallet.info);

router.post('/retreiveWallet', wallet.retrieve);

module.exports = router