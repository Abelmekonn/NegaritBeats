import userModel from '../models/User.model.js'; // Import your user model
import ArtistModel from '../models/Artist.model.js';
import { redis } from '../utils/redis.js';

// Create Artist Profile
export const createArtistProfile = async (userId, bio, genres, socialLinks, avatar) => {
    // Check if the artist already exists
    const existingArtist = await ArtistModel.findOne({ userId });
    if (existingArtist) {
        throw new Error('Artist profile already exists');
    }

    // Create a new artist profile
    const newArtist = new ArtistModel({ // Use ArtistModel instead of Artist
        userId,
        bio,
        genres,
        socialLinks,
        avatar, // Added avatar here
    });

    // Save the artist profile
    await newArtist.save();

    // Cache the artist profile in Redis
    await redis.set(userId, JSON.stringify(newArtist), 'EX', 60 * 60 * 24); // Expires in 1 day

    return newArtist;
};
