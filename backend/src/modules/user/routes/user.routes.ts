import express, {Router} from "express";

import { login, signup } from "../controllers/user.controller"

const userRouter = Router();

//userRouter.use(isAuthenticated)
userRouter.post("/login", login)
userRouter.post("/signup", signup)
userRouter.get("/ping", (req, res) => res.send("pong"))


export {userRouter};