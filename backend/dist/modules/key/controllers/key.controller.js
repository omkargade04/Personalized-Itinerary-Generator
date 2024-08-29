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
exports.KeyController = void 0;
const key_service_1 = require("../services/key.service");
class KeyController {
    constructor() {
        this.keyService = new key_service_1.KeyService();
    }
    keyGenerate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user._id;
            try {
                const data = yield this.keyService.generateKeyRateLimit(user_id);
                return res
                    .status(201)
                    .json({ message: data.message, success: true, data: data.data });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Error creating API Key", success: false });
            }
        });
    }
    rateLimiting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user._id;
            try {
                const data = yield this.keyService.rateLimitKey(user_id);
                if (data.status === 429) {
                    return res
                        .status(429)
                        .json({ message: data.message, success: true, status: data.status });
                }
                return res
                    .status(201)
                    .json({ message: data.message, success: true, data: data.data });
            }
            catch (err) {
                console.log("Error: ", err);
                res.status(500).json({ message: "Error rate limit", success: false });
            }
        });
    }
}
exports.KeyController = KeyController;
