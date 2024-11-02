import jwt from "jsonwebtoken";
import catchAsyncError from "./CatchAsyncError.js";
import { redis } from "../utils/redis.js";
import { updateAccessToken } from "../controllers/user.controller.js";

// Authenticated user middleware
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const accessToken = req.cookies.access_token;
    if (!accessToken) {
        return res.status(401).json({ success: false, message: "Please login to access this resource" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

        // Validate the user session from Redis
        const userSession = await redis.get(decoded.id);
        if (!userSession) {
            return res.status(401).json({ success: false, message: "Session expired. Please login again." });
        }

        // Attach user info to the request after parsing from Redis
        req.user = JSON.parse(userSession);
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            // Refresh access token if it has expired
            await updateAccessToken(req, res, next);
        } else {
            console.error('Token verification error:', error);
            return res.status(401).json({ success: false, message: "Invalid or expired access token" });
        }
    }
});

// Role validation middleware
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        console.log(req.user.role)
        if (!roles.includes(req.user?.role || "")) {
            return res.status(403).json({
                success: false,
                message: `Role: ${req.user?.role} is not authorized to access this resource`
            });
        }

        next();
    };
};
