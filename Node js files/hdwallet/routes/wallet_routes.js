import { Router } from 'express'
const router = Router()
import {create, info, retrieve} from '../controller/wallet_controller'


router.post('/createWallet', create);

router.get('/getWallet', info);

router.post('/retreiveWallet', retrieve);

module.exports = router