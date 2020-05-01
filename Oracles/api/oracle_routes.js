import { Router } from 'express'
import { Oracle } from './oracle'
const router = Router()
const oracle = new Oracle()

router.post('/setContract', oracle.setTokenContract)

router.get('/rng', oracle.requestRandomNumber)
router.get('/ethprice', oracle.requestEthPrice)
router.get('/btcprice', oracle.requestBtcPrice)

router.get('/rng/get', oracle.fetchRandomNumber)
router.get('/ethprice/get', oracle.fetchEthPrice)
router.get('/btcprice/get', oracle.fetchBtcPrice)


module.exports = router
