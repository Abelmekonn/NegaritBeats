import express from "express";
import { createArtistProfileController, deleteAlbum, deleteSong, updateAlbum, updateSong } from "../controllers/artist.controller.js";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware.js";
import { uploadSingle, uploadMultiple }from "../utils/mullter.js";
import { uploadAlbum, uploadSingleSong } from "../controllers/album.controller.js";

const artistRouter = express.Router();
// Route for single song upload
artistRouter.post('/upload-song/:artistId',
    isAuthenticated,
    authorizeRoles("artist"),
    uploadSingle, // Use the single upload instance for uploading a single song
    (req, res) => {
        uploadSingleSong(req, res); // Call your controller function to handle the upload
    }
);

// Route for album upload (multiple songs)
artistRouter.post('/upload-album/:artistId',
    isAuthenticated,
    authorizeRoles("artist"),
    uploadMultiple, // Use the multiple upload instance for uploading multiple songs
    (req, res) => {
        uploadAlbum(req, res); // Call your controller function to handle the album upload
    }
);

// Route to create artist profile
artistRouter.post('/create-profile',
    isAuthenticated,
    authorizeRoles("artist"),
    createArtistProfileController // Call your controller function to create the artist profile
);

// Route to update a song
artistRouter.put('/update-song/:songId',
    isAuthenticated,
    authorizeRoles("artist"),
    updateSong // Call your controller function to update the song
);

// Route to update an album
artistRouter.put('/update-album/:albumId',
    isAuthenticated,
    authorizeRoles("artist"),
    updateAlbum // Call your controller function to update the album
);

// Route to delete a song
artistRouter.delete('/delete-song/:songId',
    isAuthenticated,
    authorizeRoles("artist"),
    deleteSong // Call your controller function to delete the song
);

// Route to delete an album
artistRouter.delete('/delete-album/:albumId',
    isAuthenticated,
    authorizeRoles("artist"),
    deleteAlbum // Call your controller function to delete the album
);

// Export the artist router
export default artistRouter;