const pool = require('../config/dbConn');

// Constructor
const Class = function ({ class_name, teacher_id }) {
  this.class_name = class_name;
  this.teacher_id = teacher_id;
};

Class.create = async (newClass) => {
  try {
    const res = await pool.query('INSERT INTO classes SET ?', newClass);
    return { id: res.insertId, ...newClass };
  } catch (error) {
    throw error;
  }
};

// Class.getAll = async () => {
//   try {
//     const [classes] =
//       await pool.query(`create view class_summary as select c.class_id, c.class_name, concat(u.first_name, ' ', u.surname) as teacher_name, count(s.student_id) as num_students from classes c
//     left join users u on c.teacher_id = u.user_id
//     left join student s on c.class_id = s.class_id
//     group by c.class_id;

//     select * from class_summary;`);
//     return classes.length ? classes : null;
//   } catch (error) {
//     throw error;
//   }
// };

Class.getAll = async () => {
  try {
    const [classes] = await pool.query(`
      SELECT c.class_id, c.class_name, 
      CONCAT(u.first_name, ' ', u.surname) AS teacher_name, 
      COUNT(s.student_id) AS num_students
      FROM classes c
      LEFT JOIN users u ON c.teacher_id = u.user_id
      LEFT JOIN students s ON c.class_id = s.class_id
      GROUP BY c.class_id;
    `);
    return classes.length ? classes : null;
  } catch (error) {
    throw error;
  }
};

Class.getClsDetailsById = async (classId) => {
  try {
    const [clsDetails] = await pool.query(
      `
      SELECT 
        c.class_id, 
        c.class_name, 
        c.teacher_id
      FROM classes c
      WHERE c.class_id = ?
    `,
      [classId]
    );

    if (clsDetails.length === 0) {
      return null;
    }

    const cls = {
      class_id: clsDetails[0].class_id,
      class_name: clsDetails[0].class_name,
      teachers: [],
      students: [],
      subjects: []
    };

    // Get teacher details
    const [teacherDetails] = await pool.query(
      `
      SELECT
      u.user_id,
        u.first_name,
        u.surname,
        u.email,
        u.phone_num,
        u.profile_pic
      FROM users u
      WHERE u.user_id = ?
      `,
      [clsDetails[0].teacher_id]
    );

    if (teacherDetails.length > 0) {
      cls.teachers.push({
        teacher_id: teacherDetails[0].user_id,
        name: `${teacherDetails[0].first_name} ${teacherDetails[0].surname}`,
        email: teacherDetails[0].email,
        phone_num: teacherDetails[0].phone_num,
        profile_pic: teacherDetails[0].profile_pic
      });
    }

    // Get student details
    const [studentDetails] = await pool.query(
      `
      SELECT
        us.user_id as student_id,
        CONCAT(us.first_name, ' ', us.surname) AS student_name,
        s.admission_num,
        us.email as Student_email,
        us.profile_pic as Student_pic
      FROM students s
      LEFT JOIN users us ON s.student_id = us.user_id
      WHERE s.class_id = ?
      `,
      [classId]
    );

    studentDetails.forEach((row) => {
      cls.students.push({
        student_id: row.student_id,
        name: row.student_name,
        admission_num: row.admission_num,
        email: row.Student_email,
        profile_pic: row.Student_pic
      });
    });

    // Get subject details
    const [subjectDetails] = await pool.query(
      `
      SELECT
        sbj.subject_id,
        sbj.subject_name,
        sbj.note,
        sbj.note_pdf
      FROM subjects sbj
      WHERE sbj.class_id = ?
      `,
      [classId]
    );

    subjectDetails.forEach((row) => {
      cls.subjects.push({
        subject_id: row.subject_id,
        subject_name: row.subject_name,
        subject_note: row.note,
        subject_pdf: row.note_pdf
      });
    });

    return cls;
  } catch (error) {
    throw error;
  }
};

module.exports = Class;
