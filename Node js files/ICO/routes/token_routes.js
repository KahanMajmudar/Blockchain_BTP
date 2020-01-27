import { Router } from 'express'
const router = app.Router();
import { info } from '../controller/token_controller'


router.get('/info', info);

module.exports = router