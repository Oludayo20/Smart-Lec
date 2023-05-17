const Subject = require('../models/Subject');
const asyncHandler = require('express-async-handler');

// Create and save Subject
exports.create = asyncHandler(async (req, res) => {
  const { note, notePdf, clsId, subjectName } = req.body;

  console.log(req.body);
  if (!clsId || !subjectName) {
    res.status(400).send({
      message: 'ClassId and Subject Name can not be empty!'
    });
  }

  //  Create Subject
  const newSubject = new Subject({
    note,
    note_pdf: notePdf,
    class_id: clsId,
    subject_name: subjectName
  });

  try {
    const subject = await Subject.create(newSubject);
    return res.status(201).json({
      subject,
      message: `Subject with the name ${subjectName} is created successful`
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message || `Some error occurred while creating the ${subjectName}`
    });
  }
});

exports.getAllSubject = asyncHandler(async (req, res) => {
  try {
    const subject = await Subject.getAllSubject();
    return res.status(200).json(subject);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Subjects.'
    });
  }
});
