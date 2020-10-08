import Orm from "../../../Orm";
import assessmentController from "../assessments/assessmentsController";
let UsersOrm = new Orm("users");
let assessmentOrm = new Orm("assessments");

const controller = {
  signup: async (req, res) => {
    await UsersOrm.signUp(req.body)
      .then((user) => {
        res.status(201).json({ created: true }); //shows that the user has been created - returns the response the front end
      })
      .catch((err) => {
        res.status(501).json(err); // used 501 to mean it wasnt implemented and it lacks the ability to fulfill the request
      });
  },
  findUser: (email) => UsersOrm.find("email", email),
  getUser: (uid) => UsersOrm.find("uid", uid),
  addAssessmentToUser: async (email, assessmentId) => {
    let [user] = await controller.findUser(email);
    let lastTestKey = user.assessments ? Math.max(...Object.keys(user.assessments)) : -1;
    await UsersOrm.update({
      id: user.id,
      assessments: { ...user.assessments, [lastTestKey + 1]: assessmentId },
    });
    return true;
  },

  submitAssessment: async (req, res) => {
    let { email, assessment } = req.body;
    let result = assessmentController.calculateAssessment(assessment);


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

        res.status(200).json({
          created: true,
          email: false,
          result,
          assessmentId: submit.id,
        });
      }
    });
  },
  async getUserTests(userId) {
    let user = await UsersOrm.getOne(userId);
    let assessments = user.assessments
      ? Object.keys(user.assessments)
          .sort((a, b) => b - a)
          .map((v) => user.assessments[v])
      : [];
    
    if (assessments.length === 0) {
      return { noTests: true };
    } else {
      let results = await Promise.all(assessments.map(async (v) => {
        let {
          id,
          cd_year,
          cd_day,
          cd_month,
          created,
          ...test
        } = await assessmentOrm.getOne(v);
        return test;
      }));
      
      return {
        tests: results.map((v) => assessmentController.calculateAssessment(v)),
        noTests: false,
      };

    }
  },
};

export default controller;
