const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.route('/create').post(schoolController.create);

module.exports = router;
