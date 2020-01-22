const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const app = require('express');
const router = app.Router();
const user_controller = require('../controller/user_controller');
const admin = require('../middleware/admin_middleware');
const verified_user = require('../middleware/user_middleware'); 

router.post('/createUser', user_controller.createUser);

router.get('/viewUser', user_controller.viewUser);

router.get('/viewUser/:id', verified_user.verified_user, user_controller.viewUserid);

router.put('/updateUser/:id', verified_user.verified_user, user_controller.updateUser);

router.delete('/deleteUser/:id', admin.admin, user_controller.deleteUser);

module.exports = router