import { Router } from "express";
import controller from "./userscontrollers";
import assessmentController from "../assessments/assessmentsController";
import MailController from "../../../services/mailing/mailController";

const users = () => {
  const router = Router();

  router.post("/signup", (req, res) => {
    controller.signup(req, res);
  });

  router.get(`/emailconfirm/:email`, async (req, res) => {
    let { email } = req.params;
    await controller
      .confirmEmail(email)
      .then((user) => console.log("THE USER", user))
      .catch((err) => console.log("THE ERROR", err));
  });

  router.post("/assessment", async (req, res) => {
    controller.submitAssessment(req, res);
  });

  router.get("/test/:id", async (req, res) => {
    let test = await assessmentController.getTest(req.params.id);
    res.status(200).json(test);
  });

  router.post("/mail/send", async (req, res) => {
    /**
     * takes user id / the UID
     */
    let sendTestToUser = await MailController.send();
    console.log("SENT TEST", sendTestToUser);
  })

  return router;
};

export default users;
