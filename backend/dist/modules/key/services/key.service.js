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
exports.KeyService = void 0;
const redis_1 = __importDefault(require("../../../database/config/redis"));
const key_interface_1 = require("../../../database/interface/key.interface");
const generateKey = () => {
    let key = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
};
const getTimeUntilMidnight = () => {
    const currentTime = new Date();
    const midNight = new Date(currentTime);
    midNight.setHours(24, 0, 0, 0);
    return Math.floor((midNight.getTime() - currentTime.getTime()) / 1000);
};
class KeyService {
    generateKeyRateLimit(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const key = generateKey();
                const newKey = new key_interface_1.KeyModel({
                    user_id,
                    key,
                    isActive: true,
                    name: "",
                });
                yield newKey.save();
                // redis rate-limiting
                const redisKey = `user:${user_id}:${user_id}`;
                const redisValue = JSON.stringify(newKey);
                const timeUntilMidnight = getTimeUntilMidnight();
                yield redis_1.default.setex(redisKey, timeUntilMidnight, redisValue);
                const rateLimitKey = `user:${user_id}:rate_limit`;
                yield redis_1.default.setex(rateLimitKey, timeUntilMidnight, '10');
                return { data: newKey, message: "Key successfully generated" };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in key generation:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
    rateLimitKey(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rateKey = `user:${user_id}:${user_id}`;
                const rateLimitKey = `user:${user_id}:rate_limit`;
                const resetKeyLimit = yield redis_1.default.get(rateKey);
                let remainingRequests;
                const userKey = yield key_interface_1.KeyModel.findOne({ user_id });
                const keyData = JSON.stringify(userKey);
                if (keyData === "null") {
                    const key = generateKey();
                    const newKey = new key_interface_1.KeyModel({
                        user_id,
                        key,
                        isActive: true,
                        name: "",
                    });
                    yield newKey.save();
                    // redis rate-limiting
                    const redisKey = `user:${user_id}:${user_id}`;
                    const redisValue = JSON.stringify(newKey);
                    const timeUntilMidnight = getTimeUntilMidnight();
                    yield redis_1.default.setex(redisKey, timeUntilMidnight, redisValue);
                    const rateLimitKey = `user:${user_id}:rate_limit`;
                    yield redis_1.default.setex(rateLimitKey, timeUntilMidnight, '10');
                    return { data: newKey, message: "API Key generated successfully!" };
                }
                // Key is expired
                if (!resetKeyLimit) {
                    const timeUntilMidnight = getTimeUntilMidnight();
                    yield redis_1.default.setex(rateKey, timeUntilMidnight, keyData);
                    yield redis_1.default.setex(rateLimitKey, timeUntilMidnight, '10');
                    remainingRequests = 10;
                }
                else {
                    remainingRequests = yield redis_1.default.decr(rateLimitKey);
                }
                if (remainingRequests < 0) {
                    return {
                        status: 429, message: "API key limit exceeded, contact us to upgrade your plan",
                    };
                }
                return { data: remainingRequests, message: "API key limit available" };
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log("Error in key generation:", error.message);
                    throw error;
                }
                else {
                    throw new Error("Error occures");
                }
            }
        });
    }
}
exports.KeyService = KeyService;
