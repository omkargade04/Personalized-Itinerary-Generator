"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
//userRouter.use(isAuthenticated)
userRouter.post("/login", user_controller_1.login);
userRouter.post("/signup", user_controller_1.signup);
userRouter.get("/ping", (req, res) => res.send("pong"));
