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
    let { body } = req;
    console.log("GOT HERE THE BODY", body);
    let { email, result } = body;

    /**
     * should take the user id / the UID to get the information of who to send to
     *  for now we can work with email
     *      -
     */
    if (!email || !result) {
      res.status(400).json({ message: "You need to provide an email" });
      return;
    } else {
      let [sendTestToUser] = await MailController.sendToOne(
        email,
        "Your MBTI test result",
        `You are ${result}`
      );
      console.log("THE SENT MAIL", sendTestToUser);
      res.status(sendTestToUser.statusCode).json({message: 'sent'});
      return;
    }
  });

  return router;
};

export default users;
