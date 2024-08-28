"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const express_1 = require("express");
const user_routes_1 = require("./routes/user.routes");
// import { router } from "./routes/routes";
const UserModule = (0, express_1.Router)();
exports.UserModule = UserModule;
UserModule.use("/user", user_routes_1.userRouter);
