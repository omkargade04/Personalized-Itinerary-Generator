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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_middleware_1 = require("../middlewares/user.middleware");
const User = require("../../../database/interface/user.interface");
class UserService {
    signup(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = userData.password;
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                userData.password = hashedPassword;
                const newuser = new User(userData);
                yield newuser.save();
                const user = yield User.findOne({ email: userData.email });
                const token = yield (0, user_middleware_1.generateUserToken)(user._id);
                return { data: user, token: token };
            }
            catch (error) {
                console.log(error);
                throw new Error("Error creating user");
            }
        });
    }
    login(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = userData.email;
                const password = userData.password;
                const user = yield User.findOne({ email: email });
                if (!user) {
                    return { message: "User does not exists" };
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    return { message: "Incorrect password" };
                }
                else {
                    const token = yield (0, user_middleware_1.generateUserToken)(user._id);
                    return { data: user, token: token };
                }
            }
            catch (error) {
                console.log(error);
                throw new Error("Error logging user");
            }
        });
    }
}
exports.UserService = UserService;
