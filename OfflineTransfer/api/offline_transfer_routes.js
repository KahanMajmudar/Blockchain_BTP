import { Router } from 'express'
import { OfflineTransfer } from './offline_transfer'
const router = Router()
const offlineTransfer = new OfflineTransfer()

router.post('/eth/offline', offlineTransfer.sendEthOffline)
router.post('/eth/online', offlineTransfer.sendEthOnline)
router.post('/erc20/offline', offlineTransfer.sendErc20Offline)
router.post('/erc20/online', offlineTransfer.sendErc20Online)
router.post('/setContract', offlineTransfer.setTokenContract)

module.exports = router
