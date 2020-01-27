import { Router } from 'express';
const router = Router();
const { confirm } = require('../controller/mail_controller');


router.get('/confirm/:token', confirm);


module.exports = router