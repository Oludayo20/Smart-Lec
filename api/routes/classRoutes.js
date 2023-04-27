const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/create').post(classController.create);
router.route('/getAllCls').get(classController.getAllCls);
router.route('/getClsDetailsById').post(classController.getClsDetailsById);
router.route('/updateCls').patch(classController.updateCls);
router.route('/deleteCls').delete(classController.deleteCls);

module.exports = router;
