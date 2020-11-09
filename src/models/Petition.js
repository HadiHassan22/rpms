const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema({
  course: String,
  accepted: Boolean,
});

module.exports = mongoose.model("Petition", PetitionSchema);
