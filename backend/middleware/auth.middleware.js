import jwt from "jsonwebtoken";
import catchAsyncError from "./CatchAsyncError.js";
import { redis } from "../utils/redis.js";
import { updateAccessToken } from "../controllers/user.controller.js";

// Authenticated user
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        // Check if the token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            // Refresh the access token
            await updateAccessToken(req, res, next);
            return; // Exit to avoid further processing
        }

        // Validate the user from Redis
        const user = await redis.get(decoded.id);

        if (!user) {
            return next(new ErrorHandler("Please login to access this resource", 401));
        }

        req.user = JSON.parse(user);
        next();
    } catch (error) {
        // If token expired error, handle it by refreshing the token
        if (error.name === "TokenExpiredError") {
            await updateAccessToken(req, res, next);
        } else {
            console.error('Error verifying token:', error);
            return next(new ErrorHandler("Invalid or expired access token", 401));
        }
    }
});

// Validate user role
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler(`Role: ${req.user?.role} is not allowed to access this resource`, 403));
        }
        next();
    };
};
