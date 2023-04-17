const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.route('/register').post(staffController.register);
router.route('/login').post(staffController.login);
router.route('/getAllTeacher').get(staffController.getAllTeacher);
router.route('/refresh').get(staffController.refresh);

module.exports = router;
