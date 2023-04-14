const Staff = require('../models/Staff');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = asyncHandler(async (req, res) => {
  const {
    role,
    firstName,
    middleName,
    surname,
    email,
    password,
    phone_num,
    profile_pic
  } = req.body;

  if (!firstName || !surname || !email || !password) {
    return res.status(400).send({
      message: 'All field are compulsory!'
    });
  }

  // Hash Password
  const hashedPwd = await bcrypt.hash(password, 10);

  const staff = new Staff({
    role,
    first_name: firstName,
    middle_name: middleName,
    surname,
    email,
    password: hashedPwd,
    phone_num,
    profile_pic: profile_pic
  });

  try {
    const data = await Staff.register(staff);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while creating the Staff.'
    });
  }
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: 'All field are compulsory!'
    });
  }

  const foundUser = await Staff.login(email);

  if (!foundUser) {
    return res.status(400).send({
      message: 'No user found!'
    });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match)
    return res.status(401).json({ message: 'Password is not correct' });

  const accessToken = jwt.sign(
    {
      UserData: {
        userId: foundUser.user_id,
        role: foundUser.role,
        firstName: foundUser.first_name,
        middleName: foundUser.middle_name,
        surname: foundUser.surname,
        email: foundUser.email,
        phoneNum: foundUser.phone_num,
        profilePic: foundUser.profile_pic
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '60m' }
  );

  const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '60m'
  });

  //Create secure cookie with refresh token
  res.cookie('jwt', refreshToken, {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: 'None', //cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  });

  // Send accessToken containing user data
  res.status(201).json({ accessToken });
});

exports.getAllTeacher = asyncHandler(async (req, res) => {
  try {
    const teachers = await Staff.getAllTeacher();
    console.log(teachers);
    return res.status(201).json(teachers);
  } catch (error) {
    return res.status(500).json({
      message: error.message || 'Some error occurred while fetching Classes.'
    });
  }
});
