const express = require('express');
const movie_controller = require('../controller/movie_controller');

const router = express.Router();


router.get('/view', movie_controller.view);

router.get('/read/:id', movie_controller.read);

router.post('/create', movie_controller.create);

router.put('/update/:id', movie_controller.update);

router.delete('/delete/:id', movie_controller.delete);

module.exports = router;