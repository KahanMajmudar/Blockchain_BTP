const app = require('express');
const router = app.Router();
const mail_controller = require('../controller/mail_controller');


router.get('/confirm/:token', mail_controller.confirm);


module.exports = router