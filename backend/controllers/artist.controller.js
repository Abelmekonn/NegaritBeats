import jwt from 'jsonwebtoken';
import userModel from '../models/User.model.js'; // Import your user model
import ArtistModel from '../models/Artist.model.js';
import sendMail from '../utils/sendMail.js'; // Utility for sending emails
import { sendToken } from '../utils/jwt.js'; // Utility for sending JWT tokens
import * as userService from '../services/user.service.js'; 
import cloudinary from 'cloudinary';
import { redis } from '../utils/redis.js';
import { createArtistProfile } from '../services/artist.service.js';

// Create Artist Profile Controller
export const createArtistProfileController = async (req, res, next) => {
    try {
        const userId = req.user._id; // Assume userId comes from authenticated request
        const { bio, genres, socialLinks } = req.body; // Removed avatar from here

        // Retrieve the current user
        const currentUser = await userModel.findById(userId);
        let avatarUrl = '';

        // Check if there is a previous avatar and delete it
        if (currentUser.avatar) {
            const previousAvatarUrl = currentUser.avatar;

            // Extract public ID from the previous avatar URL
            const publicId = previousAvatarUrl.split('/').pop().split('.')[0]; // Get the public ID
            await cloudinary.v2.uploader.destroy(publicId); // Delete the previous avatar
        }

        // Check if a new avatar is provided
        if (req.file) { // Assuming you're using multer to handle file uploads
            const uploadResponse = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'avatars', // Specify the folder name in Cloudinary
            });
            avatarUrl = uploadResponse.secure_url; // Get the URL of the uploaded image
        }

        // Update the user's avatar in the user model
        await userModel.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });

        // Create the artist profile with the updated information
        const artistProfile = await createArtistProfile(userId, bio, genres, socialLinks, avatarUrl); // Pass avatarUrl to the service

        res.status(201).json({
            success: true,
            message: 'Artist profile created successfully',
            artist: artistProfile,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
