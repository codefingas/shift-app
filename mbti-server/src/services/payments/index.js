import { Router } from "express";
import controller from "./controllers";

const pay = () => {
  const router = Router();

  router.post("/fund", (req, res) => controller.fund(req, res));

  return router;
};

export default pay;
