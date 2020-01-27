import { Router } from 'express'
const router = Router()
import { buyTokens } from '../controller/ico_controller'


router.post('/buytokens', buyTokens)


module.exports = router