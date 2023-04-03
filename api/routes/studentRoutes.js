const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.route('/register').post(studentController.register);
router.route('/login').post(studentController.login);

module.exports = router;
