import { Redis } from '@upstash/redis';
require('dotenv').config();


const redisUrl = process.env.REDIS_URL || "";
const redisToken = process.env.REDIS_TOKEN || "";

const redis = new Redis({
    url: redisUrl,
    token: redisToken,
});

export default redis;
