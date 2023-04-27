const Student = require('../models/Student');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = asyncHandler(async (req, res) => {
  const {
    admissionNum,
    firstName,
    middleName,
    surname,
    email,
    phoneNum,
    clsId,
    profilePic
  } = req.body;

  console.log(req.body);

  if (!admissionNum || !firstName || !surname || !clsId) {
    return res.status(400).send({
      message: 'Admission number, first name, surname and class field required'
    });
  }

  const student = new Student({
    class_id: clsId,
    admission_num: admissionNum,
    first_name: firstName,
    middle_name: middleName,
    surname,
    email,
    phone_num: phoneNum,
    profile_pic: profilePic
  });

  try {
    const data = await Student.register(student);
    return res.status(200).json({ message: 'Student Created!!!' });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message || 'Some error occurred while creating the Student.'
    });
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { admissionNum } = req.body;

  if (!admissionNum) {
    return res.status(400).send({
      message: 'Admission Number is compulsory!'
    });
  }

  const foundUser = await Student.login(admissionNum);

  if (!foundUser) {
    return res.status(400).send({
      message: 'No user found!'
    });
  }

  const accessToken = jwt.sign(
    {
      UserData: {
        admissionNum: foundUser.admission_num,
        firstName: foundUser.first_name,
        middleName: foundUser.middle_name,
        surname: foundUser.surname,
        email: foundUser.email,
        phoneNum: foundUser.phone_num,
        profilePic: foundUser.profile_pic,
        className: foundUser.class_name
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1m' }
  );

  const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1m'
  });

  // Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  });

  // Send accessToken containing user data
  res.status(201).json({ accessToken });
});

exports.getAllStudent = asyncHandler(async (req, res) => {
  try {
    const students = await Student.getAllStudent();
    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Classes.'
    });
  }
});
