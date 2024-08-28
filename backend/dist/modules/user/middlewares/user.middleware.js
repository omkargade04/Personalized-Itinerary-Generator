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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel = require("../../../database/interface/user.interface");
const UserToken = require("../../../database/interface/user_token.interface");
// import { ReqMid } from "../../../database/interfaces/user.interface";
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        const userToken = yield UserToken.findOne({ token });
        if (!userToken) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        const user = yield UserModel.findById(userToken.userId);
        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        //   console.log(token)
        req.user = user;
        req.token = token;
        next();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.isAuthenticated = isAuthenticated;
const generateUserToken = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = process.env.TOKEN_SECRET || 'default_secret_key';
        const token = jsonwebtoken_1.default.sign({ id: user_id }, key, { expiresIn: '24h' });
        const tokenRecord = new UserToken({
            userId: user_id,
            token: token
        });
        yield tokenRecord.save();
        return token;
    }
    catch (err) {
        console.log(err);
        throw new Error('Could not generate user token');
    }
});
exports.generateUserToken = generateUserToken;
