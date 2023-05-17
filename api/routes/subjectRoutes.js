const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/create').post(subjectController.create);
router.route('/getAllSubject').get(subjectController.getAllSubject);
// router.route('/getClsDetailsById').post(classController.getClsDetailsById);
// router.route('/updateCls').patch(classController.updateCls);
// router.route('/deleteCls').delete(classController.deleteCls);

module.exports = router;
