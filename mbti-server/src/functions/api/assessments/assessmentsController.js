import Orm from "../../../Orm";
let AssessmentOrm = new Orm("assessments");

const controller = {
  calculateAssessment(assessment) {//expects a single assessment object
    /**
      fmlr : response - 4 * direction + previous value
     */
    let result = {};
    let array = Object.keys(assessment);

    for (let iv = 0; iv < array.length; iv++) {
      let value = assessment[iv],
          q = value.question.dimension,
          left = q.split("")[0],
          right = q.split("")[1],
          query = result[q];

          if(!query){
            let val = controller.calcVal(0, value);
            let evalResult = val <= 0 ? left : right;
            result[q] = {
              meaning: evalResult,
              val,
            }
          } else {
            let val = controller.calcVal(result[q].val, value);
            let evalResult = val <= 0 ? left : right;
             result[q] = {
               meaning: evalResult,
               val,
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
  calcVal(prev = 0, current){
    // let step1  = current.response - 4,
    //     step2 = step1 * current.question.direction,
    //     step3 = step2 + prev;
    // return step3;
    return (current.response - 4) * current.question.direction + prev;
  }

};

export default controller;