import express from "express";
import { createArtistProfileController } from "../controllers/artist.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware.js";
import upload from "../utils/mullter.js";
import { uploadAlbum, uploadSingleSong } from "../controllers/album.controller.js";

const artistRouter = express.Router();

// Route for single song upload
artistRouter.post('/upload-song/:artistId', isAuthenticated, authorizeRoles("artist"), upload, uploadSingleSong);


// Route for album upload (multiple songs)
artistRouter.post('/upload-album/:artistId', isAuthenticated, authorizeRoles("artist"), upload, uploadAlbum);

// Route to create artist profile
artistRouter.post('/create-profile/:artistId', isAuthenticated, authorizeRoles("artist"), createArtistProfileController);

export default artistRouter;
