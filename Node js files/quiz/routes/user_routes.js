import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false)
import { Router } from 'express'
const router = Router()
import user_controller from '../controller/user_controller'
import admin from '../middleware/admin_middleware'
import verified_user from '../middleware/user_middleware'

router.post('/createUser', user_controller.createUser);

router.get('/viewUser', user_controller.viewUser);

router.get('/viewUser/:id', verified_user.verified_user, user_controller.viewUserid);

router.put('/updateUser/:id', verified_user.verified_user, user_controller.updateUser);

router.delete('/deleteUser/:id', admin.admin, user_controller.deleteUser);

module.exports = router