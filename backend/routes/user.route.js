import express from 'express';
import {
    registrationUser,
    activateUser,
    loginUser,
    getUserProfile,
    updateProfile,
    getAllFollowedArtists,
    followArtist,
    unfollowArtist,
    likeSong,
    dislikeSong,
    getAllFavoriteSongs,
    addFavoriteSong,
    removeFavoriteSong,
    fetchAllArtists,
    getArtistById,
    logoutUser,
    resendOtp,
} from '../controllers/user.controller.js'; // Correct the path
import { authorizeRoles, isAuthenticated } from '../middleware/auth.middleware.js';
import {
    addSongToPlaylist,
    createPlaylist,
    deletePlaylist,
    getAllPlaylists,
    removeSongFromPlaylist,
} from '../controllers/playlist.controller.js';

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registrationUser);

// User activation route
userRouter.post('/activate', activateUser);

// otp resend
userRouter.post('/resend-otp', resendOtp);

// User login route
userRouter.post('/login', loginUser);

// log out
userRouter.post('/logout', logoutUser)

// Get profile (protected route)
userRouter.get('/profile', isAuthenticated, getUserProfile);

// Update profile (protected route)
userRouter.put('/profile/update', isAuthenticated, updateProfile);

// Follow / Unfollow Artists
userRouter.get('/followed-artists', isAuthenticated, getAllFollowedArtists); // Get followed artists
userRouter.post('/follow-artist', isAuthenticated, followArtist); // Follow an artist
userRouter.post('/unfollow-artist', isAuthenticated, unfollowArtist); // Unfollow an artist

// Like / Dislike Songs
userRouter.post('/like-song', isAuthenticated, likeSong); // Like a song
userRouter.post('/dislike-song', isAuthenticated, dislikeSong); // Dislike a song

// Favorite Songs
userRouter.get('/favorite-songs', isAuthenticated, getAllFavoriteSongs); // Get favorite songs
userRouter.post('/favorite-songs/add', isAuthenticated, addFavoriteSong); // Add a song to favorites
userRouter.post('/favorite-songs/remove', isAuthenticated, removeFavoriteSong); // Remove a song from favorites

// Manage Playlists
userRouter.get('/playlists', isAuthenticated, getAllPlaylists); // Get all playlists
userRouter.post('/createPlaylists', isAuthenticated, createPlaylist); // Create a new playlist
userRouter.post('/playlists/add-song', isAuthenticated, addSongToPlaylist); // Add a song to a playlist
userRouter.post('/playlists/remove-song', isAuthenticated, removeSongFromPlaylist); // Remove a song from a playlist
userRouter.delete('/playlists', isAuthenticated, deletePlaylist); // Delete a playlist

userRouter.get('/all-artists', isAuthenticated, authorizeRoles("artist", "user", "admin"), fetchAllArtists);

userRouter.get('/artist-detail/:artistId',isAuthenticated, authorizeRoles("artist", "user", "admin"),getArtistById)

export default userRouter;
