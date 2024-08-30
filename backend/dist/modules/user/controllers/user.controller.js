"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const user_middleware_1 = require("../middlewares/user.middleware");
const express = require("express");
const router = express.Router();
const User = require("../../../database/interface/user.interface");
const bcrypt = require("bcrypt");
// const authMiddleware = require("../middlewares/authMiddleware");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const password = req.body.password;
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        yield newuser.save();
        const user = yield User.findOne({ email: req.body.email });
        const token = yield (0, user_middleware_1.generateUserToken)(user._id);
        return res.status(200).send({ message: "User created successfully!", success: true, data: user, token: token });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error creating user", success: false });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .json({ message: "User does not exist", success: false });
        }
        const isMatch = yield bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .json({ message: "Password is incorrect", success: false });
        }
        else {
            const token = yield (0, user_middleware_1.generateUserToken)(user._id);
            return res.status(200).json({ message: "Login successful", success: true, data: user, token: token });
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Error Logging In", success: false, error });
    }
});
exports.login = login;
// module.exports = {signup, login};
