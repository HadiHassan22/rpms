const mongoose = require("mongoose");

const subSchema = require("../../src/models/Course");

const All_CoursesSchema = new mongoose.Schema({
   // Student_name: {
    //  type: String,
    //  required: true
    //},
    course_name_grade: {type: Array, "defeault":[]},
  });
  
  const StudentGrades = mongoose.model('Courses', All_CoursesSchema)
  
  module.exports = StudentGrades