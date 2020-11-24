const express = require("express");
var htmlparser = require("htmlparser2");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");
const multer = require('multer');
const router = express.Router();
const request = require("request-promise");
const uploader = multer();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// support parsing of application/json type post data
router.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
router.use(bodyParser.urlencoded({ extended: true }));


//loading models
const Prerequisites = require("../../src/models/prerequisites")
const Petition = require("./petition");
const student_Course = require("../../src/models/Course"); 
const StudentGrades = require("../../src/models/All_Courses");
const User = require("../../src/models/Users");
const validateRegisterInput = require("./register");
const validateLoginInput = require("./login");
const { prependListener } = require("../../src/models/prerequisites");


//post rule
router.post("/add-rule", async (req, res) => {
  const course = new Prerequisites(req.body);
  console.log(course);
  
  course
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });

});

// get rule
router.get("/get-rule", async (req, res) => {
  //console.log(course);
  response = await Prerequisites.find({},(err, prerequisites)=> prerequisites);
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(response, null, 4));
  

});






//register and login calls
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;




//parser call
router.post("/transcript",uploader.single('src'), async (req, res, next) => {
  const src = req.file;
  const content = src.buffer.toString('utf8');
  const $ = cheerio.load(content);
  const rows = $(".datadisplaytable").find("tr");
  var courses = [];

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    if ($(row).find("td").length == 9) {
      courses.push($(row).find("td"));
    }
  }

  var all_courses = new StudentGrades();
  for (var j = 0; j < courses.length; j++) {
    var course = new student_Course({
        course_name: $(courses[j][0]).text() + $(courses[j][1]).text(),
        grade: $(courses[j][4]).text(),
    });
    all_courses.course_name_grade.push(course)
  }
  all_courses.save();
});

//posting ONE course to the database (dont use this)
router.post("/add-course", (req, res) => {
  const course = new student_Course(req.body);
  console.log(course);
  course
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
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
  console.log(response);
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
