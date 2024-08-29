"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
require('dotenv').config();
const redisUrl = process.env.REDIS_URL || "";
console.log("Redis URL: ", redisUrl);
const urlParts = new URL(redisUrl);
const redis = new ioredis_1.default({
    host: urlParts.hostname,
    port: Number(urlParts.port) || 6379,
    password: urlParts.password || undefined,
    retryStrategy: (times) => {
        return Math.min(times * 100, 2000);
    },
    reconnectOnError: (err) => {
        const targetError = "READONLY";
        if (err.message.includes(targetError)) {
            return true;
        }
        return false;
    }
});
redis.on('connect', () => {
    console.log("Redis connection successful");
    return;
});
// redis.on('error', (err) => {
//     console.error('Redis connection error:', err);
//     return;
// });
exports.default = redis;
