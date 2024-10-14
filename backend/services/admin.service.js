import ArtistModel from "../models/Artist.model.js";
import UserModel from "../models/User.model.js";
import { redis } from "../utils/redis.js";

export const approveArtist = async (artistId) => {
    const artist = await ArtistModel.findById(artistId);
    if (!artist) {
        throw new Error("Artist not found.");
    }
    artist.isApproved = true;
    
    await artist.save();

    return artist;
};


const USERS_CACHE_KEY = "all_users";

// Fetch all users from the database
export const getAllUsersFromDatabase = async () => {
    try {
        const users = await UserModel.find().select('name email avatar role'); // Adjust fields as necessary

        return users;
    } catch (error) {
        throw new Error(`Failed to fetch users from database: ${error.message}`);
    }
};

// Fetch all users with Redis caching for admin
export const getAllUsersWithCache = async () => {
    try {
        // Check Redis cache
        const cachedUsers = await redis.get(USERS_CACHE_KEY);
        
        if (cachedUsers) {
            console.log("Serving users from cache");
            return JSON.parse(cachedUsers); // Return cached users
        }

        // If not cached, fetch from DB
        const users = await getAllUsersFromDatabase();

        // Cache the result in Redis (set with an expiration time, e.g., 1 hour)
        await redis.set(USERS_CACHE_KEY, JSON.stringify(users), 'EX', 60 * 60);

        console.log("Users fetched from DB and cached in Redis");

        return users;
    } catch (error) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
};


const USER_CACHE_KEY = (userId) => `user_${userId}`;

// Fetch a single user from the database
export const getUserByIdFromDatabase = async (userId) => {
    try {
        const user = await UserModel.findById(userId)
            .select('name email avatar role'); // Adjust the fields as necessary

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user from database: ${error.message}`);
    }
};

// Fetch single user details with Redis caching
export const getUserByIdWithCache = async (userId) => {
    try {
        const cacheKey = USER_CACHE_KEY(userId);

        // Check if the user details are cached in Redis
        const cachedUser = await redis.get(cacheKey);

        if (cachedUser) {
            console.log(`Serving user ${userId} from cache`);
            return JSON.parse(cachedUser); // Return cached user if available
        }

        // If not found in cache, fetch from database
        const user = await getUserByIdFromDatabase(userId);

        // Cache the user details and set an expiration time (e.g., 1 hour)
        await redis.set(cacheKey, JSON.stringify(user), 'EX', 60 * 60);

        console.log(`User ${userId} fetched from DB and cached in Redis`);

        return user;
    } catch (error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
};

// Delete a user by ID from the database
export const deleteUserByIdFromDatabase = async (userId) => {
    try {
        const result = await UserModel.findByIdAndDelete(userId);

        if (!result) {
            throw new Error('User not found');
        }

        // Optionally, you can delete the cached user from Redis if necessary
        const cacheKey = USER_CACHE_KEY(userId);
        await redis.del(cacheKey); // Remove the cache for this user

        return result;
    } catch (error) {
        throw new Error(`Failed to delete user from database: ${error.message}`);
    }
};

// Delete an artist by ID from the database
export const deleteArtistByIdFromDatabase = async (artistId) => {
    try {
        const result = await ArtistModel.findByIdAndDelete(artistId);

        if (!result) {
            throw new Error('Artist not found');
        }

        // Optionally, you can delete the cached artist from Redis if necessary
        const cacheKey = ARTIST_CACHE_KEY(artistId);
        await redis.del(cacheKey); // Remove the cache for this artist

        return result;
    } catch (error) {
        throw new Error(`Failed to delete artist from database: ${error.message}`);
    }
};