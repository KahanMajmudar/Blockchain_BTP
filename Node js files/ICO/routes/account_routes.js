import { Router } from 'express'
const router = Router()
import { sendEthSigned } from '../controller/account_controller'


router.post('/send', sendEthSigned)


module.exports = router