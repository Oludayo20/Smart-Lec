const pool = require('../config/dbConn');

// Constructor
const Student = function ({
  class_id,
  admission_num,
  first_name,
  middle_name,
  surname,
  email,
  phone_num,
  profile_pic
}) {
  this.admission_num = admission_num;
  this.first_name = first_name;
  this.middle_name = middle_name;
  this.surname = surname;
  this.email = email;
  this.phone_num = phone_num;
  this.profile_pic = profile_pic || 'Avatar';
  this.class_id = class_id;
};

Student.register = async (newStudent) => {
  const sql = `
    INSERT INTO users (first_name, middle_name, surname, email, profile_pic, phone_num)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const sqlStudent = `
    INSERT INTO students (student_id, class_id, admission_num)
    VALUES (?, ?, ?);
  `;

  let connection;

  try {
    const connection = await pool.getConnection();

    // Insert the user record
    const [userResult] = await connection.query(sql, [
      newStudent.first_name,
      newStudent.middle_name,
      newStudent.surname,
      newStudent.email,
      newStudent.profile_pic,
      newStudent.phone_num
    ]);

    // Insert the student record in a transaction
    await connection.beginTransaction();
    const [studentResult] = await connection.query(sqlStudent, [
      userResult.insertId,
      newStudent.class_id,
      newStudent.admission_num
    ]);
    await connection.commit();

    connection.release();

    return { data: studentResult.insertId, ...newStudent };
  } catch (err) {
    if (connection) {
      await connection.rollback();
      connection.release();
    }
    return err.sqlMessage;
  }
};

Student.login = async (admissionNum) => {
  try {
    const connection = await pool.getConnection();
    const [res] = await connection.query(
      'select * from student join users on  student.student_id = users.user_id where student.admission_num = ?',
      [admissionNum]
    );
    connection.release();
    return res.length ? res[0] : null;
  } catch (err) {
    return `Failed to get Student with username ${admissionNum}: ${err.sqlMessage}`;
  }
};
module.exports = Student;
