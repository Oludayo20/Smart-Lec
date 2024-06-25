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
    return res.status(201).json({
      cls,
      message: `Class with the name ${clsName} is created successfully`
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message || `Some error occurred while creating the ${clsName}`
    });
  }
});

exports.getAllCls = asyncHandler(async (req, res) => {
  try {
    const classes = await Class.getAll();
    return res.status(200).json(classes);
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
    return res.status(200).json(clsDetails);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Classes.'
    });
  }
});

exports.updateCls = asyncHandler(async (req, res) => {
  const { clsName, teacherId, clsId } = req.body;

  if (!clsName || !clsId) {
    return res.status(400).send({
      message: 'Name or Id can not be empty!'
    });
  }

  try {
    const updatedCls = await Class.updateCls({ clsName, teacherId, clsId });
    return res.status(200).json({
      updatedCls,
      message: `Class with the name ${clsName} is Updated successfully`
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while updating the Class.'
    });
  }
});

exports.deleteCls = asyncHandler(async (req, res) => {
  const { clsId } = req.body;

  console.log(req.body);

  if (!clsId) {
    return res.status(400).send({
      message: 'Class Id not found!'
    });
  }

  try {
    const deletedCls = await Class.deleteCls(clsId);
    return res.status(200).json({
      deletedCls,
      message: `Class is deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while deleting the Class.'
    });
  }
});
