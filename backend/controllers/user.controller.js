import jwt from 'jsonwebtoken';
import userModel from '../models/User.model.js'; // Import your user model
import catchAsyncError from '../middleware/CatchAsyncError.js'; // Async error wrapper
import sendMail from '../utils/sendMail.js'; // Utility for sending emails
import { sendToken } from '../utils/jwt.js'; // Utility for sending JWT tokens
import * as userService from '../services/user.service.js'; 
import cloudinary from 'cloudinary';
import { redis } from '../utils/redis.js';


// Register user
export const registrationUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password  } = req.body; // Default role

    // Check if the email already exists
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
        return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // User object including role
    const user = { name, email, password };

    // Create activation token
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    // Prepare data for email
    const data = { user: { name: user.name }, activationCode };

    try {
        // Send activation email
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            template: "activation-mail.ejs", // Email template
            data,
        });

        // Respond with success
        res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} to activate your account!`,
            activationToken: activationToken.token,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

// Create activation token (JWT token)
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });

    return { token, activationCode };
};

// Resend activation email (OTP)
export const resendOtp = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create a new activation token
    const activationToken = createActivationToken({ 
        name: user.name, 
        email: user.email, 
        password: user.password, // Consider if you want to expose the password here
        role: user.role 
    });
    const activationCode = activationToken.activationCode;

    // Prepare data for email
    const data = { user: { name: user.name }, activationCode };

    try {
        // Send activation email
        await sendMail({
            email: user.email,
            subject: "Resend Activation Email",
            template: "activation-mail.ejs", // Email template
            data,
        });

        res.status(200).json({
            success: true,
            message: `Activation email has been resent to ${user.email}!`,
            activationToken: activationToken.token,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});


// Activate user
export const activateUser = catchAsyncError(async (req, res, next) => {
    const { activation_token, activation_code } = req.body;

    if (!activation_token) {
        return res.status(400).json({ success: false, message: "Activation token is missing" });
    }

    // Verify the activation token
    let newUser;
    try {
        newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid activation token" });
    }

    // Check if activation code matches
    if (newUser.activationCode !== activation_code) {
        return res.status(400).json({ success: false, message: "Invalid activation code" });
    }

    const { name, email, password } = newUser.user; // Include role

    // Check if the user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Create new user with role
    await userModel.create({ name, email, password });

    res.status(201).json({
        success: true,
        message: "User activated successfully!",
    });
});


// Login user
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password); // Assuming you have a method to compare passwords
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Send token
    sendToken(user, 200, res);
});

// Logout user
export const logoutUser = catchAsyncError(async (req, res, next) => {
    // Clear the token from the cookie
    res.cookie("token", null, {
        expires: new Date(Date.now()), // Immediate expiration
        httpOnly: true, // Ensures cookie is sent only over HTTP(S), not client-side JavaScript
        secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
        sameSite: "strict", // Ensures cookie is only sent to same site, for security
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully!",
    });
});


export const updateAccessToken = catchAsyncError(async (req, res, next) => {
    const refreshToken = req.cookies.refresh_token; // Get the refresh token from cookies

    // Check if the refresh token is available
    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "Refresh token is missing",
        });
    }

    let decoded;
    try {
        // Verify the refresh token
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN); // Ensure you use the correct secret
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid refresh token",
        });
    }

    // Fetch the user session from Redis
    const session = await redis.get(decoded.id);
    if (!session) {
        return res.status(401).json({
            success: false,
            message: "Session expired. Please login again.",
        });
    }

    const user = JSON.parse(session); // Parse the user session data from Redis

    // Generate a new access token (expires in 15 minutes)
    const accessToken = jwt.sign(
        { id: user._id }, 
        process.env.ACCESS_TOKEN,  // Ensure this secret is correct
        { expiresIn: '1d' } // 15 minutes
    );

    // Generate a new refresh token (expires in 7 days)
    const newRefreshToken = jwt.sign(
        { id: user._id }, 
        process.env.REFRESH_TOKEN,  // Ensure this secret is correct
        { expiresIn: '7d' } // 7 days
    );

    req.user = user; // Attach the user to the request object

    // Set new tokens in cookies with appropriate options
    res.cookie("access_token", accessToken, { 
        httpOnly: true, 
        sameSite: 'strict', 
        maxAge: 1 * 24 * 60 * 60 * 1000,  // 1day
        secure: process.env.NODE_ENV === 'production' // Only set secure cookies in production
    });
    res.cookie("refresh_token", newRefreshToken, { 
        httpOnly: true, 
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        secure: process.env.NODE_ENV === 'production' 
    });

    // Store the updated session back into Redis with an expiration of 7 days
    await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7 days expiration in Redis

    res.status(200).json({ success: true, accessToken, refreshToken: newRefreshToken }); // Optionally return new tokens
});


// Get user profile controller
export const getUserProfile = catchAsyncError(async (req, res, next) => {

    const userId = req.user._id; // Get user ID from the authenticated user (via JWT token)
    console.log(userId)
    const userProfile = await userService.getUserProfile(userId);
    
    res.status(200).json({
        success: true,
        user: userProfile
    });
});


export const updateProfile = catchAsyncError(async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { name, password, avatar } = req.body; // Destructure name, password, and avatar

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        // Update name if provided
        if (name) {
            user.name = name;
        }

        // Update password if provided
        if (password) {
            user.password = password; // Ensure this is hashed before saving
        }

        // Update avatar if provided
        if (avatar) {
            if (user.avatar?.public_id) {
                // Destroy the old avatar from Cloudinary
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            }

            // Upload new avatar to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            });

            // Update the user's avatar in the database
            user.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }

        // Save the updated user info to the database
        await user.save();

        // Update the Redis cache with the new user data
        await redis.set(userId, JSON.stringify(user));

        // Send the response
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});


// follow / un followArtist
export const getAllFollowedArtists = async (req, res) => {
    try {
        const userId = req.user._id;
        const followingArtists = await userService.getFollowedArtists(userId);

        res.status(200).json({
            success: true,
            followingArtists,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const followArtist = async (req, res) => {
    const userId = req.user._id;
    const { artistId } = req.body;

    const user = await userModel.findById(userId);
    if (!user.followingArtists.includes(artistId)) {
        user.followingArtists.push(artistId);
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Artist followed successfully",
        user,
    });
};

export const unfollowArtist = async (req, res) => {
    const userId = req.user._id;
    const { artistId } = req.body;

    const user = await userModel.findById(userId);
    user.followingArtists = user.followingArtists.filter(
        (id) => id.toString() !== artistId
    );

    await user.save();
    
    res.status(200).json({
        success: true,
        message: "Artist unfollowed successfully",
        user,
    });
};

// Like/Dislike Songs
export const likeSong = async (req, res) => {
    const userId = req.user._id;
    const { songId } = req.body;

    const user = await userModel.findById(userId);
    if (!user.likedSongs.includes(songId)) {
        user.likedSongs.push(songId);
        user.dislikedSongs = user.dislikedSongs.filter(
            (id) => id.toString() !== songId
        ); // Remove from disliked if it was there
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Song liked successfully",
        user,
    });
};

export const dislikeSong = async (req, res) => {
    const userId = req.user._id;
    const { songId } = req.body;

    const user = await userModel.findById(userId);
    if (!user.dislikedSongs.includes(songId)) {
        user.dislikedSongs.push(songId);
        user.likedSongs = user.likedSongs.filter(
            (id) => id.toString() !== songId
        ); // Remove from liked if it was there
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Song disliked successfully",
        user,
    });
};

// Add/Remove Favorite Songs
export const getAllFavoriteSongs = async (req, res) => {
    try {
        const userId = req.user._id;
        const favoriteSongs = await userService.getFavoriteSongs(userId);

        res.status(200).json({
            success: true,
            favoriteSongs,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const addFavoriteSong = async (req, res) => {
    const userId = req.user._id;
    const { songId } = req.body;

    const user = await userModel.findById(userId);
    if (!user.favoriteSongs.includes(songId)) {
        user.favoriteSongs.push(songId);
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Song added to favorites",
        user,
    });
};

export const removeFavoriteSong = async (req, res) => {
    const userId = req.user._id;
    const { songId } = req.body;

    const user = await userModel.findById(userId);
    user.favoriteSongs = user.favoriteSongs.filter(
        (id) => id.toString() !== songId
    );

    await user.save();

    res.status(200).json({
        success: true,
        message: "Song removed from favorites",
        user,
    });
};


export const fetchAllArtists = async (req, res) => {
    try {
        const artists = await userService.fetchArtistsWithCache();
        return res.status(200).json({
            success: true,
            data: artists,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getArtistById = async (req, res) => {
    const { artistId } = req.params; // Get the artistId from URL params

    try {
        const artist = await userService.getSingleArtistWithCache(artistId); // Fetch artist with caching

        res.status(200).json({
            success: true,
            message: "Artist fetched successfully",
            artist, // Send back the artist's detailed information
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
