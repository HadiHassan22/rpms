const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema(
  {
    student_id: String,
    type: String,
    course: String,
    course2: String,
    status: String,
    requirements: String,
    email: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Petition", PetitionSchema);
