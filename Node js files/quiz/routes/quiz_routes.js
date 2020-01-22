const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const app = require('express');
const router = app.Router();
const quiz_controller = require('../controller/question_controller');
const admin = require('../middleware/admin_middleware');
const verified_user = require('../middleware/user_middleware');


router.post('/createQuestion', admin.admin, quiz_controller.createQuestion);

router.get('/view', admin.admin, quiz_controller.view);

router.get('/viewQuiz', verified_user.verified_user, quiz_controller.viewQuiz);

router.get('/viewQuestion/:id', quiz_controller.viewQuestion);

router.put('/updateQuestion/:id', admin.admin, quiz_controller.updateQuestion);

router.delete('/deleteQuestion/:id', admin.admin, quiz_controller.deleteQuestion);

router.post('/sendAnswers', verified_user.verified_user, quiz_controller.sendAnswers);

module.exports = router