const pool = require('../config/dbConn');

// Constructor
const Class = function ({ class_name, teacher_id }) {
  this.class_name = class_name;
  this.teacher_id = teacher_id;
};

Class.create = async (newClass) => {
  try {
    const connection = await pool.getConnection();
    const res = await connection.query('INSERT INTO classes SET ?', newClass);
    connection.release();
    return null, { id: res.insertId, ...newClass };
  } catch (err) {
    return err.sqlMessage;
  }
};

Class.getAll = async () => {
  try {
    const [classes] = await pool.query('SELECT * FROM classes');
    return classes.length ? classes : null;
  } catch (err) {
    return err.sqlMessage;
  }
};

module.exports = Class;
