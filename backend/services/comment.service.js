import Album from "../models/Album.model.js";
import Song from "../models/Song.model.js";
import { redis } from "../utils/redis.js";

const COMMENT_CACHE_KEY = (id) => `comments_${id}`;

// Fetch comments for song or album from database
export const fetchCommentsFromDB = async (itemId, isSong = true) => {
    let item;

    if (isSong) {
        item = await Song.findById(itemId).populate({
            path: 'comments',
            populate: { path: 'user', select: 'name avatar' }
        });

        if (!item) throw new Error('Song not found');
    } else {
        item = await Album.findById(itemId).populate({
            path: 'comments',
            populate: { path: 'user', select: 'name avatar' }
        });

        if (!item) throw new Error('Album not found');
    }

    return item.comments;
};

// Fetch comments with Redis caching
export const fetchCommentsWithCache = async (itemId, isSong = true) => {
    try {
        const cacheKey = COMMENT_CACHE_KEY(itemId);

        // Check if the comments are cached in Redis
        const cachedComments = await redis.get(cacheKey);
        if (cachedComments) {
            console.log(`Serving comments for ${itemId} from cache`);
            return JSON.parse(cachedComments);
        }

        // If not in cache, fetch from the database
        const comments = await fetchCommentsFromDB(itemId, isSong);

        // Cache the comments and set an expiration time (e.g., 1 hour)
        await redis.set(cacheKey, JSON.stringify(comments), 'EX', 60 * 60);

        console.log(`Comments for ${itemId} fetched from DB and cached in Redis`);
        return comments;
    } catch (error) {
        throw new Error(`Failed to fetch comments: ${error.message}`);
    }
};