import { Router } from 'express';
const router = Router();
import { confirm } from '../controller/mail_controller'


router.get('/confirm/:token', confirm);


module.exports = router