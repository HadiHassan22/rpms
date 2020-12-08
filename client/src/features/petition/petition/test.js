const studentGrades = [
  { course_name: "CMPS 200", grade: "78" },
  { course_name: "CMPS 212", grade: "w" },
];
const rules = [
  {
    course_name: "CMPS 253",
    prerequisiteCourse: "CMPS 200",
    prerequisiteGrade: "60",
  },
  {
    course_name: "CMPS 253",
    prerequisiteCourse: "CMPS 212",
    prerequisiteGrade: "60",
  },
];
const course = "CMPS 253";

const rulesToApply = rules.filter((rule) => rule.course_name === course);

const requirementsMet = rulesToApply.every(
  (rule) =>
    parseInt(
      studentGrades.find((grade) => {
        console.log(rule);
        console.log(grade.grade);
        return grade.course_name === rule.prerequisiteCourse;
      }).grade
    ) >= parseInt(rule.prerequisiteGrade)
);
console.log("requirements: " + requirementsMet);
