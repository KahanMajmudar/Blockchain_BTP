import { Router } from 'express';
const router = Router();
import { MailController } from './mail_controller'
const mailer = new MailController()

router.get('/send', mailer.confirm);


module.exports = router