import jwt from "jsonwebtoken";
import catchAsyncError from "./CatchAsyncError.js";
import { redis } from "../utils/redis.js";
import { updateAccessToken } from "../controllers/user.controller.js";


// Authenticated user
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const authHeader = req.headers.authorization; // Extract token from Authorization header
    const accessToken = authHeader && authHeader.split(' ')[1]; // Get the token part (Bearer token)

    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Please login to access this resource" });
    }

    console.log("Access Token:", accessToken); // Log the access token

    try {
        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN); // Ensure the secret is loaded
        console.log("Decoded Token:", decoded); // Log decoded token information

        // Check if user exists in Redis
        const user = await redis.get(decoded._id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found. Please login to access this resource" });
        }

        req.user = JSON.parse(user); // Attach user to request
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message); // Log the error message
        // If token has expired, refresh the access token
        if (error.name === "TokenExpiredError") {
            await updateAccessToken(req, res); // Refresh token logic should be handled in this function
        } else {
            return res.status(401).json({ success: false, message: "Invalid or expired access token" });
        }
    }
});

// Validate user role
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || "")) {
            return res.status(403).json({
                success: false,
                message: `Role: ${req.user?.role} is not allowed to access this resource`
            });
        }
        next();
    };
};
