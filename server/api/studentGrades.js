const { response } = require("express");
const STUDENTGRADES = require("../../src/models/All_Courses");

class StudentGrades {
  saveStudentGrades = async (data, student_id) => {
    return STUDENTGRADES.findOneAndUpdate({ student_id: student_id }, data, {
      new: true,
      upsert: true,
    });
  };

  getStudentGrades = async (student_id) => {
    return STUDENTGRADES.findOne(
      { student_id: student_id },
      (err, grades) => grades
    );
  };
}

module.exports = StudentGrades;
