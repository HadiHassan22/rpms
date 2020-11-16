const mongoose = require("mongoose");

const subSchema = require("../../src/models/Course");

const All_CoursesSchema = new mongoose.Schema({
    Student_name: {
      type: String,
      required: true
    },
    course_names: [ {grade: {type: String, required: true}, course_name: {type: String,required: true}}],
  });
  
  const All_Courses = mongoose.model('Courses', All_CoursesSchema)
  
  module.exports = All_Courses