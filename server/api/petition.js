const PETITION = require("../../src/models/Petition");

class Petition {
  savePetitionDataToMongo = async (number, data) => {
    const filter = {
      number: number,
    };

    const replace = {
      ...filter,
      ...data,
    };
    await this.findOneReplace(filter, replace);
  };

  getPetitionDataFromMongo = async (number) => {
    return PETITION.findOne({ number: number });
  };

  async findOneReplace(filter, replace) {
    await PETITION.collection.findOneAndReplace(filter, replace, {
      new: true,
      upsert: true,
    });
  }
}

module.exports = Petition;
