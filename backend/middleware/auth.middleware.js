import jwt from "jsonwebtoken";
import catchAsyncError from "./CatchAsyncError.js";
import { redis } from "../utils/redis.js";
import { updateAccessToken } from "../controllers/user.controller.js";

// Authenticated user
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    console.log(accessToken)
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Please login to access this resource" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN); // Corrected to ACCESS_TOKEN_SECRET

        // Check if the token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            // Refresh the access token
            await updateAccessToken(req, res, next);
            return; // Exit to avoid further processing
        }

        // Validate the user from Redis
        const user = await redis.get(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Please login to access this resource" });
        }

        req.user = JSON.parse(user);
        next();
    } catch (error) {
        // If token expired error, handle it by refreshing the token
        if (error.name === "TokenExpiredError") {
            await updateAccessToken(req, res, next);
        } else {
            console.error('Error verifying token:', error);
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
