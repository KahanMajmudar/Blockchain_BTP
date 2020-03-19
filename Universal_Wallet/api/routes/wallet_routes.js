import { Router } from 'express'
import { WalletController } from '../controllers/wallet_controller'
const router = Router()


//CREATE Wallet
router.post('/create', wallet_controller.create)
//RETRIEVE Wallet
// router.post('/retrieve', )
// //CREATE Account (bch, btc, eth)
// router.post('/create/bch', )
// router.post('/create/btc', )
// router.post('/create/eth', )

module.exports = router

