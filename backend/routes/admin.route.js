import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware.js";
import { approveArtistController } from "../controllers/admin.controller.js";

const adminRoute = express.Router();

// Use :artistId to capture the dynamic parameter in the URL
adminRoute.put('/approve_artist/:artistId', isAuthenticated, authorizeRoles("admin"), approveArtistController);

export default adminRoute;
