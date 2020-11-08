const express = require("express");
const router = express.Router();

const Petition = require("./petition");

router.post("/petition", async (req, res) => {
  const { number, type } = req.body;
  let petition = new Petition();
  let petitionData = {
    number: number,
    type: type ? type : "capacity",
    courses: [{ name: "CMPS 299" }],
    accepted: false,
  };
  console.log(number, type);

  await petition.savePetitionDataToMongo(number, petitionData);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(petitionData, null, 4));
});

router.get("/petition", async (req, res) => {
  const { number } = req.query;
  let petition = new Petition();

  let petitionData = await petition.getPetitionDataFromMongo(number);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(petitionData, null, 4));
});

module.exports = router;
