import bcrypt from 'bcrypt';
import userModel from '../models/User.model.js';
import ErrorHandler from '../utils/errorHandler.js';


// Fetch user profile by ID
export const getUserProfile = async (userId) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return {
        username: user.username,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
        likedSongs: user.likedSongs,
        favoriteSongs: user.favoriteSongs,
        followingArtists: user.followingArtists,
        playlists: user.playlists,
    };
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