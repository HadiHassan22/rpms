const express = require("express");
const router = express.Router();

const Petition = require("./petition");

//CREATE
router.post("/petition", async (req, res) => {
  let petition = new Petition();
  let petitionData = req.body;
  let response = await petition.savePetition(petitionData);
  console.log(petitionData);
  res.header("Content-Type", "application/json");
  res.send(response);
});

//UPDATE
router.get("/petition/edit/:id", async (req, res) => {
  const id = req.params.id;
  let petition = new Petition();
  let response = await petition.getPetitions();
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 4));
});

router.post("/petition/edit/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  let petition = new Petition();
  let response = await petition.updatePetitionById(id, data);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 4));
});

router.get("/petition/remove/:id", async (req, res) => {
  const id = req.params.id;
  let petition = new Petition();
  response = await petition.removePetitionById(id);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 4));
});

//RETRIEVE
router.get("/petition", async (req, res) => {
  let petition = new Petition();
  let response = await petition.getPetitions();
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(petitionData, null, 4));
});

//DELETE

module.exports = router;
