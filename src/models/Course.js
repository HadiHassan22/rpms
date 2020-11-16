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

const Course = mongoose.model('Course', subSchema)

module.exports = Course