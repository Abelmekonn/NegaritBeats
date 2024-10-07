import userModel from '../models/user.model.js';

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

// Update user profile service
export const updateUserProfileService = async (userId, updateFields) => {
    // Find the user by ID and update the fields
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateFields, {
        new: true, // Return the updated document
        runValidators: true, // Ensure the fields are validated
    });

    if (!updatedUser) {
        throw new Error('User not found');
    }

    return updatedUser;
};