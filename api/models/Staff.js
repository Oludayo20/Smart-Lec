const pool = require('../config/dbConn');

// Constructor
const Staff = function ({
  role,
  first_name,
  middle_name,
  surname,
  email,
  password,
  phone_num,
  profile_pic
}) {
  this.role = role || 'Teacher';
  this.first_name = first_name;
  this.middle_name = middle_name;
  this.surname = surname;
  this.email = email;
  this.password = password;
  this.phone_num = phone_num;
  this.profile_pic = profile_pic || 'Avatar';
};

Staff.register = async (newStaff) => {
  console.log(newStaff);
  try {
    const connection = await pool.getConnection();
    const res = await connection.query('INSERT INTO users SET ?', newStaff);
    connection.release();
    return null, { id: res.insertId, ...newStaff };
  } catch (err) {
    return err.sqlMessage;
  }
};

Staff.login = async (email) => {
  try {
    const connection = await pool.getConnection();
    const [res] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    connection.release();
    return res.length ? res[0] : null;
  } catch (err) {
    return `Failed to get staff with username ${email}: ${err.sqlMessage}`;
  }
};

Staff.getAllTeacher = async () => {
  try {
    const [teacher] = await pool.query(
      'select user_id, first_name, surname, profile_pic from users where role = "Teacher";'
    );
    return teacher.length ? teacher : null;
  } catch (err) {
    return err.sqlMessage;
  }
};

module.exports = Staff;
