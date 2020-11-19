const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema(
  {
    number: Number,
    type: String,
    course: String,
    course2: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Petition", PetitionSchema);
