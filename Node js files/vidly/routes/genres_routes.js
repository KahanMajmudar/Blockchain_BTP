const express = require('express');
const auth = require('../middleware/auth_middleware');
const admin = require('../middleware/admin_middleware');
const genre_controller = require('../controller/genre_controller');

const router = express.Router();


router.get('/view', genre_controller.view);

router.get('/read/:id', genre_controller.read);

router.post('/create', auth.auth, genre_controller.create);

router.put('/update/:id', [ auth.auth, admin.admin ], genre_controller.update);

router.delete('/delete/:id', [ auth.auth, admin.admin ], genre_controller.delete);


module.exports = router;