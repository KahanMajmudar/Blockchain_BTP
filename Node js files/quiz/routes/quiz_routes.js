import mongoose from 'mongoose'
mongoose.set('useFindAndModify', false)
import { Router } from 'express'
const router = Router();
import quiz_controller from '../controller/question_controller'
import admin from '../middleware/admin_middleware'
import verified_user from '../middleware/user_middleware'


router.post('/createQuestion', admin.admin, quiz_controller.createQuestion);

router.get('/view', admin.admin, quiz_controller.view);

router.get('/viewQuiz', verified_user.verified_user, quiz_controller.viewQuiz);

router.get('/viewQuestion/:id', quiz_controller.viewQuestion);

router.put('/updateQuestion/:id', admin.admin, quiz_controller.updateQuestion);

router.delete('/deleteQuestion/:id', admin.admin, quiz_controller.deleteQuestion);

router.post('/sendAnswers', verified_user.verified_user, quiz_controller.sendAnswers);

module.exports = router