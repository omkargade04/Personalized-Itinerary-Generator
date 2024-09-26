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
const user_interface_1 = __importDefault(require("../../../database/interface/user.interface"));
const user_token_interface_1 = __importDefault(require("../../../database/interface/user_token.interface"));
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader ? authHeader.replace("Bearer ", "") : null;
        if (!token) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        const userToken = yield user_token_interface_1.default.findOne({ token });
        if (!userToken) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        const user = yield user_interface_1.default.findById(userToken.userId);
        if (!user) {
            return res.status(401).json({ status: false, message: "Unauthorized user!" });
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (err) {
        console.error("Error in isAuthenticated middleware:", err);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
});
exports.isAuthenticated = isAuthenticated;
const generateUserToken = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = process.env.SECRET_TOKEN || "jjn sj";
        if (!key) {
            throw new Error("TOKEN_SECRET is not set in environment variables");
        }
        const token = jsonwebtoken_1.default.sign({ id: user_id }, key, { expiresIn: '24h' });
        const tokenRecord = new user_token_interface_1.default({
            userId: user_id,
            token
        });
        yield tokenRecord.save();
        return token;
    }
    catch (err) {
        console.error("Error in generateUserToken function:", err);
        throw new Error("Could not generate user token");
    }
});
exports.generateUserToken = generateUserToken;
