const mongoose = require("mongoose");

const PetitionSchema = new mongoose.Schema({
  number: Number,
  type: String,
  courses: [
    {
      name: String,
    },
  ],
  accepted: Boolean,
});

module.exports = mongoose.model("Petition", PetitionSchema);
