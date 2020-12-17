const { response } = require("express");
const PETITION = require("../../src/models/Petition");

class Petition {
  savePetition = async (data) => {
    return PETITION.create(data);
  };

  getPetitions = async () => {
    return PETITION.find({}, (err, petitions) => petitions);
  };

  getPetitionsByStudent = async (email) => {
    return PETITION.find({ email: email }, (err, petitions) => petitions);
  };

  updatePetitionById = async (id, data) => {
    return PETITION.findByIdAndUpdate(id, data);
  };

  removePetitionById = async (id) => {
    return PETITION.findByIdAndRemove(id);
  };

  async findOneReplace(filter, replace) {
    await PETITION.collection.findOneAndReplace(filter, replace, {
      new: true,
      upsert: true,
    });
  }
}

module.exports = Petition;
