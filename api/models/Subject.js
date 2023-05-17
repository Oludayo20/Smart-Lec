const pool = require('../config/dbConn');

// Constructor
const Subject = function ({ note, note_pdf, class_id, subject_name }) {
  this.note = note;
  this.note_pdf = note_pdf;
  this.class_id = class_id;
  this.subject_name = subject_name;
};

Subject.create = async (newSubject) => {
  try {
    const { insertId } = await pool.query(
      'INSERT INTO subjects SET ?',
      newSubject
    );
    return { id: insertId, ...newSubject };
  } catch (error) {
    return error;
  }
};

Subject.getAllSubject = async () => {
  try {
    const [subjects] = await pool.query(`
      SELECT s.subject_id, s.subject_name, s.note, s.note_pdf, s.class_id, c.class_name
      FROM subjects s
      JOIN classes c ON s.class_id = c.class_id
    `);

    return subjects.length ? subjects : null;
  } catch (err) {
    return err.sqlMessage;
  }
};

module.exports = Subject;
