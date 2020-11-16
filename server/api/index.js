const express = require("express");
//var http = require("http");
//var https = require("https");
var htmlparser = require("htmlparser2");
const bodyParser = require('body-parser')
const cheerio = require('cheerio');
//const got = require('got');
const router = express.Router();
const request = require("request-promise");
var fs = require('fs');

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));

const Petition = require("./petition");

const Course = require("../../src/models/Course");

const All_Courses = require("../../src/models/All_Courses");






//parser call
router.post('/transcript', async (req,res)=>{
  const $ = cheerio.load(fs.readFileSync('C:/Users/yehya/Desktop/a.html'));
  const rows = $('.datadisplaytable').find('tr')
  var courses = [];

 
 for (var i =0; i < rows.length; i++){
    var row = rows[i]
    if ($(row).find('td').length == 9){
      courses.push($(row).find('td'))
    }

  }

  var Allcourses = []
    
  for (var j = 0; j<courses.length; j++){
   
    var course = new Course({course_name:$(courses[j][0]).text()+$(courses[j][1]).text(), grade:$(courses[j][4]).text()})
    Allcourses.push(course)
    
    course.save()
     // .then((result)=>{
       // res.send(result)
      //})
      //.catch((err) =>{
       // console.log(err);
      //});
  
  
  }

  


    
    
});

//posting ONE course to the database (dont use this)
router.post('/add-course', (req,res)=>{
  const course = new Course(req.body);
  console.log(course);
  course.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err) =>{
        console.log(err);
      });
});

//posting courses to the database
router.post('/add-courses', (req,res)=>{
  const course = new All_Courses(req.body);
  console.log(course);
  course.save()
      .then((result)=>{
        res.send(result)
      })
      .catch((err) =>{
        console.log(err);
      });
});


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
  res.send(JSON.stringify(response, null, 4));
});



//DELETE
module.exports = router;
