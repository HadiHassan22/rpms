const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  prerequisiteCourseName: { type: String, required: false },
  prerequisiteCourseGrade: { type: String, required: false },
  prerequisiteCourseName2: { type: String, required: false },
  prerequisiteCourseGrade2: { type: String, required: false },
});

const course_rules = mongoose.model("course_rule", subSchema);

module.exports = course_rules;
