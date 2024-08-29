"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("@upstash/redis");
require('dotenv').config();
const redisUrl = process.env.REDIS_URL || "";
const redisToken = process.env.REDIS_TOKEN || "";
const redis = new redis_1.Redis({
    url: redisUrl,
    token: redisToken,
});
exports.default = redis;
