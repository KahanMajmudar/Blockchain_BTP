const express = require('express');
const rental_controller = require('../controller/rental_controller');

const router = express.Router();


router.get('/view', rental_controller.view);

router.get('/read/:id', rental_controller.read);

router.post('/create', rental_controller.create);

// router.put('/update/:id', rental_controller.update);

// router.delete('/delete/:id', rental_controller.delete);


module.exports = router;