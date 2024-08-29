import { Router } from "express";
import { KeyController } from "../controllers/key.controller";
import { isAuthenticated } from "../../user/middlewares/user.middleware";

const router = Router();
const keyController = new KeyController();

router.post("/", isAuthenticated, (req, res) => keyController.keyGenerate(req, res));
router.get("/", isAuthenticated, (req, res) => keyController.rateLimiting(req, res));

export {router};