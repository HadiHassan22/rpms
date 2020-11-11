const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema({
  number: Number,
  petition_type: String,
  course: String,
  course2: String,
  accepted: Boolean,
});

module.exports = mongoose.model("Petition", PetitionSchema);
