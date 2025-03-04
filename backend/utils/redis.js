import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = () => {
    if (!process.env.REDIS_URL) {
        throw new Error("Redis connection failed: REDIS_URL is not set");
    }

    const client = new Redis(process.env.REDIS_URL);

    client.on("error", (err) => {
        console.error("Redis error:", err);
    });

    client.on("connect", () => {
        console.log("Connected to Redis...");
    });

    return client;
};

export const redis = redisClient();
