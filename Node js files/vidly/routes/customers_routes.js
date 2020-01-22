const express = require('express');
const customer_controller = require('../controller/customer_controller');

const router = express.Router();


router.get('/view', customer_controller.view);

router.get('/read/:id', customer_controller.read);

router.post('/create', customer_controller.create);

router.put('/update/:id', customer_controller.update);

router.delete('/delete/:id', customer_controller.delete);

module.exports = router;