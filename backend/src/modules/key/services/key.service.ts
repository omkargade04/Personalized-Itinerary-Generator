import redis from "../../../database/config/redis";
import { KeyModel } from "../../../database/interface/key.interface";

const generateKey = (): string => {
  let key = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

export class KeyService {
  async generateKeyRateLimit(user_id: string) {
    try {
      const key = generateKey();
      const newKey = new KeyModel({
        user_id,
        key,
        isActive: true,
        name: "",
      });

      await newKey.save();

      // redis rate-limiting
      const redisKey = `user:${user_id}:${user_id}`;
      const redisValue = JSON.stringify(newKey);

      const timeUntilMidnight = getTimeUntilMidnight();
      await redis.setex(redisKey, timeUntilMidnight, redisValue);

      const rateLimitKey = `user:${user_id}:rate_limit`;
      await redis.setex(rateLimitKey, timeUntilMidnight, '10');

      return { data: newKey, message: "Key successfully generated" };
    } catch (error: any) {
      if (error instanceof Error) {
        console.log("Error in key generation:", error.message);

        throw error;
      } else {
        throw new Error("Error occures");
      }
    }
  }

  async rateLimitKey(user_id: string) {
    try {
      const rateKey = `user:${user_id}:${user_id}`;
      const rateLimitKey = `user:${user_id}:rate_limit`;

      const resetKeyLimit = await redis.get(rateKey);
      let remainingRequests: number;

      const userKey = await KeyModel.findOne({ user_id });
      const keyData = JSON.stringify(userKey);

      if (keyData === "null") {
        const key = generateKey();
        const newKey = new KeyModel({
          user_id,
          key,
          isActive: true,
          name: "",
        });

        await newKey.save();

        // redis rate-limiting
        const redisKey = `user:${user_id}:${user_id}`;
        const redisValue = JSON.stringify(newKey);

        const timeUntilMidnight = getTimeUntilMidnight();
        await redis.setex(redisKey, timeUntilMidnight, redisValue);

        const rateLimitKey = `user:${user_id}:rate_limit`;
        await redis.setex(rateLimitKey, timeUntilMidnight, '10');

        return { data: newKey, message: "API Key generated successfully!" };
      }

      // Key is expired
      if (!resetKeyLimit) {
        const timeUntilMidnight = getTimeUntilMidnight();
        await redis.setex(rateKey, timeUntilMidnight, keyData);
        await redis.setex(rateLimitKey, timeUntilMidnight, '10');
        remainingRequests = 10;
      } else {
        remainingRequests = await redis.decr(rateLimitKey);
      }

      if (remainingRequests < 0) {
        return {
          status: 429, message: "API key limit exceeded, contact us to upgrade your plan",
        };
      }

      return { data: remainingRequests, message: "API key limit available" };
    } catch (error: any) {
      if (error instanceof Error) {
        console.log("Error in key generation:", error.message);

        throw error;
      } else {
        throw new Error("Error occures");
      }
    }
  }
}
