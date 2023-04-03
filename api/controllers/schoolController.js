const School = require('../models/School');
const asyncHandler = require('express-async-handler');

// Create and save school
exports.create = asyncHandler(async (req, res) => {
  const { name, logo, color } = req.body;

  if (!name) {
    res.status(400).send({
      message: 'Name can not be empty!'
    });
  }

  // create School
  const school = new School({
    name,
    logo,
    color
  });

  try {
    const data = await School.create(school);
    console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while creating the School.'
    });
  }
});
