const inquirer = require("inquirer");
const colors = require("cli-color");
const figlet = require("figlet");

const {
  questions,
  styledQuestions,
  featureQuestions,
  proceedExitQuestions,
} = require("./questions/questions");
const handler = require("./choicesHandler");
const { jsonConcat } = require("./utils/jsonManipulation");

const cliPurple = colors.xterm(13);
const titleColor = colors.xterm(202);

async function interactiveCLI() {
  const answers = await inquirer.prompt(questions);
  var nestedAnswer;
  switch (answers.type) {
    case "styled-component":
      nestedAnswer = await inquirer.prompt(styledQuestions);
      break;
    case "feature":
      nestedAnswer = await inquirer.prompt(featureQuestions);
      break;
    default:
      break;
  }
  jsonConcat(answers, nestedAnswer);
  handler(answers);
  console.log("\nSummary: ");
  if (answers.path === "") {
    answers.path = "default";
  }
  console.table(answers);
}

async function proceedOrExit() {
  const answers = await inquirer.prompt(proceedExitQuestions);
  return !(answers.next === "no");
}

async function main() {
  console.clear();
  const coolTitle = await figlet.textSync("areeba", {
    font: "Standard",
    horizontalLayout: "fitted",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  });
  console.log(titleColor(coolTitle));
  console.log(cliPurple("React-redux-ts template builder."));

  while (true) {
    await interactiveCLI();
    if (!(await proceedOrExit())) {
      break;
    }
  }
}

main();
