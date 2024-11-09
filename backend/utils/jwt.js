import dotenv from "dotenv";
import { redis } from '../utils/redis.js'; 

dotenv.config(); // Load environment variables

const accessTokenOptions = {
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // Enable secure cookies in production
}; 

const refreshTokenOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
};

// Send token
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // Sanitize the user object by omitting sensitive data
    const userSession = {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,         // Include avatar
        name: user.name,             // Include name
        playlists: user.playlists,   // Include playlists
        __v: user.__v                // Include version if needed
    };

    // Store sanitized user session in Redis
    redis.set(user._id.toString(), JSON.stringify(userSession), (err) => {
        if (err) {
            console.error("Error storing session in Redis:", err);
            return res.status(500).json({ 
                success: false, 
                message: "Internal server error - session storage failed" 
            });
        }

        // Set cookies
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        // Respond with user data and tokens
        res.status(statusCode).json({
            success: true,
            user: userSession, // Send sanitized user data
        });
    });
};

export { sendToken };
