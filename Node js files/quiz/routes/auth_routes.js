import { Router } from 'express'
const router = Router()
import { login } from '../controller/auth_controller'
// import verified_user from '../middleware/user_middleware';


router.post('/login', login);

module.exports = router