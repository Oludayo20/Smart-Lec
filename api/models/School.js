const pool = require('../config/dbConn');

// Constructor
const School = function ({ name, color, logo }) {
  this.name = name;
  this.color = color;
  this.logo = logo;
};

School.create = async (newSchool) => {
  try {
    const connection = await pool.getConnection();
    const res = await connection.query('INSERT INTO school SET ?', newSchool);
    connection.release();
    return null, { id: res.insertId, ...newSchool };
  } catch (err) {
    return err.sqlMessage;
  }
};

module.exports = School;
