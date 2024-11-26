import bcrypt from 'bcrypt';
import userModel from '../models/User.model.js';
import ErrorHandler from '../utils/errorHandler.js';
import ArtistModel from '../models/Artist.model.js';
import { redis } from '../utils/redis.js';
import UserModel from '../models/User.model.js';


export const getUserProfile = async (userId) => {
    try {
        // Check if user data exists in Redis cache
        let cachedData = await redis.get(userId);

        if (cachedData) {
            cachedData = JSON.parse(cachedData);

            // If the cached user role is artist but lacks artist-specific data, fetch artist data
            if (cachedData.role === 'artist' && !cachedData.bio) {
                const artistData = await ArtistModel.findOne({ userId }).lean();
                if (artistData) {
                    Object.assign(cachedData, {
                        artistId:artistData._id,
                        bio: artistData.bio,
                        genres: artistData.genres,
                        socialLinks: artistData.socialLinks,
                        albums: artistData.albums,
                        topTracks: artistData.topTracks,
                        followers: artistData.followers,
                        isApproved: artistData.isApproved,
                    });
                    // Update the cache with complete artist data
                    await redis.set(userId, JSON.stringify(cachedData), 'EX', 3600);
                }
            }
            return cachedData;
        }

        // Fetch from MongoDB if data is not in Redis
        const user = await UserModel.findById(userId).lean();
        if (!user) {
            throw new Error('User not found');
        }

        // Structure basic user data
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
            dislikedSongs: user.dislikedSongs,
            favoriteSongs: user.favoriteSongs,
            followingArtists: user.followingArtists,
            isPremium: user.isPremium,
            likedSongs: user.likedSongs,
            playlists: user.playlists,
        };

        // If the user is an artist, fetch and merge artist-specific data
        if (user.role === 'artist') {
            const artistData = await ArtistModel.findOne({ userId: user._id }).lean();
            if (artistData) {
                Object.assign(userData, {
                    bio: artistData.bio,
                    genres: artistData.genres,
                    socialLinks: artistData.socialLinks,
                    albums: artistData.albums,
                    topTracks: artistData.topTracks,
                    followers: artistData.followers,
                    isApproved: artistData.isApproved,
                });
            }
        }

        // Cache the complete user data in Redis with an expiration of 1 hour
        await redis.set(userId, JSON.stringify(userData), 'EX', 3600);

        return userData;

    } catch (error) {
        throw new Error(error.message || 'Failed to fetch user profile');
    }
};

// Update User Profile Service
export const updateUserProfile = async (userId, updatedData) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }

    // Check if the password needs to be updated
    if (updatedData.password) {
        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        updatedData.password = await bcrypt.hash(updatedData.password, salt);
    }

    // Update user fields (name, avatar, and password)
    user.name = updatedData.name || user.name;
    user.avatar = updatedData.avatar || user.avatar;
    user.password = updatedData.password || user.password;

    // Save updated user information
    await user.save();

    return user;
};

// Get all playlists for a user
export const getUserPlaylists = async (userId) => {
    const user = await userModel.findById(userId).populate({
        path: 'playlists.songs',
        select: 'title artist duration',
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user.playlists;
};

// Get all artists followed by the user
export const getFollowedArtists = async (userId) => {
    const user = await userModel.findById(userId).populate({
        path: 'followingArtists',
        select: 'name genre',
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user.followingArtists;
};

// Get all favorite songs for a user
export const getFavoriteSongs = async (userId) => {
    const user = await userModel.findById(userId).populate({
        path: 'favoriteSongs',
        select: 'title artist album duration',  // Assuming your Song model has these fields
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user.favoriteSongs;
};

const ARTISTS_CACHE_KEY = "all_artists";

// Fetch artists from the database and populate user details
export const fetchArtistsFromDB = async () => {
    try {
        const artists = await ArtistModel.find()
            .populate({
                path: 'userId',  // Fetch user information based on userId
                model: userModel, // Reference to User model
                select: 'name email avatar',  // Select only the required fields from User
            });
        return artists;
    } catch (error) {
        throw new Error(`Failed to fetch artists from database: ${error.message}`);
    }
};

// Fetch artists with Redis caching
export const fetchArtistsWithCache = async () => {
    try {
        // Check if artists are cached in Redis
        const cachedArtists = await redis.get(ARTISTS_CACHE_KEY);

        if (cachedArtists) {
            
            return JSON.parse(cachedArtists); // Return cached artists if available
        }

        // If not found in cache, fetch from database
        const artists = await fetchArtistsFromDB();

        // Store the artists data in Redis and set it to expire in 1 hour (3600 seconds)
        await redis.set(ARTISTS_CACHE_KEY, JSON.stringify(artists), 'EX', 60 * 60);



        return artists;
    } catch (error) {
        throw new Error(`Failed to fetch artists: ${error.message}`);
    }
};

const ARTIST_CACHE_KEY = (artistId) => `artist_${artistId}`;

// Fetch single artist from the database
export const getSingleArtistFromDatabase = async (artistId) => {
    try {
        const artist = await ArtistModel.findById(artistId)
            .populate({
                path: 'userId',
                model: UserModel, // Make sure UserModel is correctly capitalized
                select: 'name email avatar',
            })
            .populate({
                path: 'albums',
                select: 'title releaseDate',
            })
            .populate({
                path: 'singleSongs',
                select: 'title duration',
            });

        if (!artist) {
            throw new Error('Artist not found');
        }

        return artist;
    } catch (error) {
        throw new Error(`Failed to fetch artist from database: ${error.message}`);
    }
};

// Fetch single artist details with Redis caching
export const getSingleArtistWithCache = async (artistId) => {
    try {
        const cacheKey = ARTIST_CACHE_KEY(artistId);

        // Check if the artist details are cached in Redis
        const cachedArtist = await redis.get(cacheKey);

        if (cachedArtist) {
            
            return JSON.parse(cachedArtist); // Return cached artist if available
        }

        // If not found in cache, fetch from database
        const artist = await getSingleArtistFromDatabase(artistId);

        // Cache the artist details and set an expiration time (e.g., 1 hour)
        await redis.set(cacheKey, JSON.stringify(artist), 'EX', 60 * 60);

        return artist;
    } catch (error) {
        throw new Error(`Failed to fetch artist: ${error.message}`);
    }
};
