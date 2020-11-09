const express = require("express");
const router = express.Router();

const Petition = require("./petition");

//CREATE
router.post("/petition", async (req, res) => {
  const { course } = req.body;
  let petition = new Petition();
  let petitionData = {
    course: course,
    accepted: req.body.accepted ? req.body.accepted : false,
  };

  await petition.savePetition(course, petitionData);
  res.redirect("/api/petition");
});

//UPDATE
router.get("/petition/edit/:id", async (req, res) => {
  const id = req.params.id;
  let petition = new Petition();
  let petitionData = await petition.getPetitions();
  res.render("petitionEdit.ejs", { petitions: petitionData, petitionId: id });
});

router.post("/petition/edit/:id", async (req, res) => {
  const id = req.params.id;
  const course = req.body.course;
  let petition = new Petition();
  await petition.updatePetitionById(id, course);
  res.redirect("/api/petition");
});

router.get("/petition/remove/:id", async (req, res) => {
  const id = req.params.id;
  let petition = new Petition();
  await petition.removePetitionById(id);
  res.redirect("/api/petition");
});

//RETRIEVE
router.get("/petition", async (req, res) => {
  let petition = new Petition();
  let petitionData = await petition.getPetitions();
  res.render("petition.ejs", { petitions: petitionData });
});

//DELETE

module.exports = router;
