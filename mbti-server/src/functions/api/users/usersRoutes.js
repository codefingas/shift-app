import {Router} from "express";
import controller from "./userscontrollers";
const users = () => {
    const router = Router();
    router.post("/signup", (req, res) => {
        controller.signup(req, res);
    })

    return router;
}

export default users;