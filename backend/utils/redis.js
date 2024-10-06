import { Redis } from "ioredis";
import dotenv from "dotenv"; // Import dotenv for environment variables

dotenv.config(); // Load environment variables

// Create a new Redis client instance
const redisClient = () => {
    // Check if REDIS_URL is provided
    if (process.env.REDIS_URL) {
        console.log("Connected to Redis...");
        return new Redis(process.env.REDIS_URL); // Connect to Redis with the provided URL
    }
    throw new Error("Redis connection failed: REDIS_URL is not set");
};

// Export the Redis client instance
export const redis = redisClient(); // Initialize the Redis client
