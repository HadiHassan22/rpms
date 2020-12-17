const mongoose = require("mongoose");

const subSchema = require("../../src/models/Course");

const All_CoursesSchema = new mongoose.Schema({
  // Student_name: {
  //  type: String,
  //  required: true
  //},
  student_id: { type: String },
  courses: { type: Array },
});

const StudentGrades = mongoose.model("StudentGrades", All_CoursesSchema);

module.exports = StudentGrades;
