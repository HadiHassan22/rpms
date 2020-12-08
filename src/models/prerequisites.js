const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  prerequisiteCourseName: { type: String, required: true },
  prerequisiteCourseGrade: { type: String, required: true },
});

const course_rules = mongoose.model("course_rule", subSchema);

module.exports = course_rules;
