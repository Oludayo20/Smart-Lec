const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/create').post(classController.create);
router.route('/getAllCls').get(classController.getAllCls);
router.route('/getClsDetailsById').post(classController.getClsDetailsById);

module.exports = router;
