import { Router } from "express";
import controller from "./userscontrollers";
import assessmentController from "../assessments/assessmentsController";
import MailController from "../../../services/mailing/mailController";

const users = () => {
  const router = Router();

  router.post("/signup", async (req, res) => {
    await controller.signup(req, res);
    return;
  });

  router.post("/getUserData", async (req, res) => {
    let [user] = await controller.getUser(req.body.uid);
    res.status(200).json(user);
    return;
  })

  router.get(`/emailconfirm/:email`, async (req, res) => {
    let { email } = req.params;
    await controller
      .findUser(email)
      .then((users) => {
        if (users.length === 0) {
          res.status(200).json({ message: "is not a user", isUser: false });
          return;
        } else {
          res.status(200).json({ message: "is a user", isUser: true });
          return;
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ isUser: false, message: `an error occured ${err}` });
      });
    return;
  });

  router.post("/assessment", async (req, res) => {
    await controller.submitAssessment(req, res);
    return;
  });

  router.get("/getTests/:userId", async (req, res) => {
    let tests = await controller.getUserTests(req.params.userId);
    res.status(200).json(tests);
    return;
  });

  router.get("/test/:id", async (req, res) => {
    let test = await assessmentController.getTest(req.params.id);
    res.status(200).json(test);
    return;
  });

  router.post("/mail/send", async (req, res) => {
    let { body } = req;
    let { email, result } = body;
    if (!email || !result) {
      res.status(400).json({ message: "You need to provide an email" });
      return;
    } else {
      let [sendTestToUser] = await MailController.sendToOne(
        email,
        "Your MBTI test result",
        `You are ${result}`
      );
      res.status(sendTestToUser.statusCode).json({ message: "sent" });
      return;
    }
  });

  return router;
};

export default users;
