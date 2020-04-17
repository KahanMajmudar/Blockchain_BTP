import { Router } from 'express'
import { OfflineTransfer } from './offline_transfer'
const router = Router()
const offlineTransfer = new OfflineTransfer()

router.post('/eth/offline', offlineTransfer.sendEthOffline)
router.post('/eth/online', offlineTransfer.sendEthOnline)
// router.post('/erc20/offline', user.updateUser)
// router.post('/erc20/online', user.deleteUser)

module.exports = router
