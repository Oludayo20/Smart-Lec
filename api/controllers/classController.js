const Class = require('../models/Class');
const asyncHandler = require('express-async-handler');

// Create and save Class
exports.create = asyncHandler(async (req, res) => {
  const { className, teacherId } = req.body;

  if (!className) {
    res.status(400).send({
      message: 'Name or Teacher can not be empty!'
    });
  }

  // create Class
  const newClass = new Class({
    class_name: className,
    teacher_id: teacherId
  });

  try {
    const data = await Class.create(newClass);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while creating the Class.'
    });
  }
});

exports.getClasses = asyncHandler(async (req, res) => {
  try {
    const classes = await Class.getAll();
    console.log(classes);
    return res.status(201).json({ data: classes, message: 'Class gotten!!' });
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Classes.'
    });
  }
});
