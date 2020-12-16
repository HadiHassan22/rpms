const questions = [
  {
    type: "list",
    name: "type",
    message: "What do you want to generate?",
    choices: ["Styled-Component", "Feature"],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "name",
    message: "File name:",
    validate: function (value) {
      var pass = value.match(/^[a-z][A-Za-z]*$/i);
      if (pass) {
        return true;
      }

      return "Please enter a valid file name";
    },
    filter: String,
  },
];

const proceedExitQuestions = [
  {
    type: "list",
    name: "next",
    message: "Do you want to generate something else?",
    choices: ["yes", "no"],
    filter: function (val) {
      return val.toLowerCase();
    },
  },
];

const styledQuestions = [
  {
    type: "input",
    name: "path",
    message: "File path: ",
    suffix: "src/styled/",
    validate: function (value) {
      var pass = value.match(/(^$)|(^[a-z][A-Za-z/]*$)/i);
      if (pass) {
        return true;
      }

      return "Please enter a valid path";
    },
    filter: String,
  },
];

const featureQuestions = [
  {
    type: "input",
    name: "path",
    message: "File path: ",
    suffix: "src/features/",
    validate: function (value) {
      var pass = value.match(/(^$)|(^[a-z][A-Za-z/]*$)/i);
      if (pass) {
        return true;
      }

      return "Please enter a valid path";
    },
    filter: String,
  },
];

module.exports = {
  questions,
  styledQuestions,
  featureQuestions,
  proceedExitQuestions,
};
