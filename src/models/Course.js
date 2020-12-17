const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  grade: {
    type: String,
    required: true
  },
  course_name: {
    type: String,
    required: true
  }
});

const student_Course = mongoose.model('studentCourse', subSchema)

module.exports = student_Course