import express from "express";
import {  createArtistProfileController } from "../controllers/artist.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware.js";
const artistRouter = express.Router();

// Route to create artist profile
artistRouter.post('/create-profile', isAuthenticated,authorizeRoles("artist"), createArtistProfileController);

export default artistRouter;