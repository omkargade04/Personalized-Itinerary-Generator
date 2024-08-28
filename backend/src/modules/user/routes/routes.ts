import { Router } from "express";
import { UserController } from "../controllers/users.controller";

const router = Router();
const userController = new UserController();

router.post("/v2/signup", (req, res) => userController.signup(req, res));
router.post("/v2/login", (req, res) => userController.login(req, res));

export {router};