const Class = require('../models/Class');
const asyncHandler = require('express-async-handler');

// Create and save Class
exports.create = asyncHandler(async (req, res) => {
  const { clsName, teacherId } = req.body;

  if (!clsName) {
    res.status(400).send({
      message: 'Name can not be empty!'
    });
  }

  // create Class
  const newClass = new Class({
    class_name: clsName,
    teacher_id: teacherId
  });

  try {
    const cls = await Class.create(newClass);
    return res.status(200).json({
      cls,
      message: `Class with the name ${clsName} is created successfully`
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while creating the Class.'
    });
  }
});

exports.getAllCls = asyncHandler(async (req, res) => {
  try {
    const classes = await Class.getAll();
    console.log(classes);
    return res.status(201).json(classes);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Classes.'
    });
  }
});

exports.getClsDetailsById = asyncHandler(async (req, res) => {
  const { classId } = req.body;

  if (!classId) {
    res.status(404).send({
      message: 'Class Id Required...'
    });
  }
  try {
    const clsDetails = await Class.getClsDetailsById(classId);
    console.log(clsDetails);
    return res.status(201).json(clsDetails);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Classes.'
    });
  }
});
