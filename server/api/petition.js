const { response } = require("express");
const PETITION = require("../../src/models/Petition");

class Petition {
  savePetition = async (course, data) => {
    const filter = {
      course: course,
    };

    const replace = {
      ...filter,
      ...data,
    };
    await this.findOneReplace(filter, replace);
  };

  getPetitions = async () => {
    return PETITION.find({}, (err, petitions) => petitions);
  };

  updatePetitionById = async (id, course) => {
    return PETITION.findByIdAndUpdate(id, { course: course });
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
