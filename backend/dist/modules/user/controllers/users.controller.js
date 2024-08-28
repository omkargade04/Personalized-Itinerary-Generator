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
exports.UserController = void 0;
const services_1 = require("../services");
class UserController {
    constructor() {
        this.userService = new services_1.UserService();
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                data: {},
                token: ""
            };
            const userData = req.body;
            try {
                const data = yield this.userService.signup(userData);
                user.data = data.data;
                user.token = data.token;
                return res.status(201).json({ message: "User created successfully!", success: true, data: user.data, token: user.token });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error creating user", success: false });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                data: {},
                token: ""
            };
            const userData = req.body;
            try {
                const data = yield this.userService.login(userData);
                if (data.message === "Incorrect password") {
                    return res
                        .status(200)
                        .json({ message: "Password is incorrect", success: false });
                }
                else if (data.message === "User does not exists") {
                    return res
                        .status(404)
                        .json({ message: "User does not exist", success: false });
                }
                user.data = data.data;
                user.token = data.token;
                console.log(data);
                return res.status(201).json({ message: "User logged in successfully!", success: true, data: user.data, token: user.token });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error logging in user", success: false });
            }
        });
    }
}
exports.UserController = UserController;
