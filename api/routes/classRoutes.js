const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.route('/create').post(classController.create);
router.route('/getClasses').get(classController.getClasses);

module.exports = router;
