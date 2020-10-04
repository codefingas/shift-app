import Orm from "../../../Orm";
let AssessmentOrm = new Orm("assessments");

const controller = {
  calculateAssessment(assessment) {
    // console.log("THE ASSESSMENT HANDLER", assessment);
    let result = {};
    let array = Object.keys(assessment);

    for (let iv = 0; iv < array.length; iv++) {
      let value = assessment[iv],
        q = value.question.dimension,
        query = result[q];
      if (!query) {
        result[q] = {
          response: value.response,
          meaning: value.question.meaning,
          direction: value.question.direction,
        };
      } else {
        if (result[q].response <  value.response) {
          result[q] = {
            response: value.response,
            meaning: value.question.meaning,
            direction: value.question.direction,
          };
        }
      }
    }

    return Object.values(result)
      .map((v) => v.meaning)
      .join("");
  },
  getTest: async (assessmentId) => {
    let {
      id,
      cd_year,
      cd_day,
      cd_month,
      created,
      ...test
    } = await AssessmentOrm.getOne(assessmentId);
    return controller.calculateAssessment(test);
  },
};

export default controller;
