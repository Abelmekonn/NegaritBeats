import dotenv from "dotenv";
import { redis } from '../utils/redis.js'; 

dotenv.config(); // Load environment variables

// Options for cookies
const accessTokenOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // true in production, false otherwise
};

const refreshTokenOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // true in production, false otherwise
};

// Send token
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // Sanitize the user object by omitting the password
    const userSession = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,         // Include avatar
        createdAt: user.createdAt,   // Include creation date
        dislikedSongs: user.dislikedSongs,
        favoriteSongs: user.favoriteSongs,
        followingArtists: user.followingArtists,
        isPremium: user.isPremium,
        likedSongs: user.likedSongs,
        name: user.name,             // Include name
        playlists: user.playlists,   // Include playlists
        __v: user.__v                // Include version if needed
    };

    // Store sanitized user session in Redis
    redis.set(user._id.toString(), JSON.stringify(userSession), (err) => {
        if (err) {
            console.error("Error storing session in Redis:", err);
            // Optionally handle the error (e.g., respond with an error message)
        }
    });

    // Set cookies
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    // Respond with user data and tokens
    res.status(statusCode).json({
        success: true,
        user: userSession, // Send sanitized user data (excluding password)
        accessToken,
        refreshToken,
    });
};




// Export the sendToken function as a named export
export { sendToken };
