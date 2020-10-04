import Orm from "../../../Orm";
import assessmentController from "../assessments/assessmentsController";
let UsersOrm = new Orm("users");
let assessmentOrm = new Orm("assessments");

const controller = {
  findUser: (email) => UsersOrm.find("email", email),
  addAssessmentToUser: async (email, assessmentId) => {
    let [user] = await controller.findUser(email);
    let lastTestKey = Math.max(...Object.keys(user.assessments));
    await UsersOrm.update({
      id: user.id,
      assessments: { ...user.assessments, [lastTestKey + 1]: assessmentId },
    });
    return true;
  },
  submitAssessment: async (req, res) => {
    /**
     * so its supposed to confirm email and return results
     *  -
     */
    let { email, assessment } = req.body;
    let result = assessmentController.calculateAssessment(assessment);
    // console.log("THE ASSESSMENT", assessment, "THE RESULT", result);
  
    await Promise.all([
      controller.findUser(email),
      assessmentOrm.save(assessment),
    ]).then(async ([isUser, submit]) => {
      if (isUser.length > 0) {
        await controller.addAssessmentToUser(email, submit.id); //TODO: FIND A BETTER LOGIC TO SAVE USER DATA WHEN the user is accepted
        res.status(200).json({
          created: true,
          email: true,
          result,
          assessmentId: submit.id,
        });
      } else {
        await UsersOrm.save({ email, assessments: { [0]: submit.id } });

        res
          .status(200)
          .json({
            created: true,
            email: false,
            result,
            assessmentId: submit.id,
          });
      }
    });
  },
};

export default controller;
