import userModel from '../models/User.model.js'; // Import your user model
import ArtistModel from '../models/Artist.model.js';
import cloudinary from 'cloudinary';
import { createArtistProfile } from '../services/artist.service.js';
import Song from '../models/Song.model.js';
import Album from '../models/Album.model.js';

// Create Artist Profile Controller
export const createArtistProfileController = async (req, res) => {
    try {
        const userId = req.user._id; // Assume userId comes from authenticated request
        const { bio, genres, socialLinks } = req.body; // Removed avatar from here

        // Retrieve the current user
        const currentUser = await userModel.findById(userId);
        let avatarUrl = '';

        // Check if there is a previous avatar and delete it
        if (currentUser.avatar) {
            const previousAvatarUrl = currentUser.avatar;

            // Extract public ID from the previous avatar URL
            const publicId = previousAvatarUrl.split('/').pop().split('.')[0]; // Get the public ID
            await cloudinary.v2.uploader.destroy(publicId); // Delete the previous avatar
        }

        // Check if a new avatar is provided
        if (req.file) { // Assuming you're using multer to handle file uploads
            const uploadResponse = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'avatars', // Specify the folder name in Cloudinary
            });
            avatarUrl = uploadResponse.secure_url; // Get the URL of the uploaded image
        }

        // Update the user's avatar in the user model
        await userModel.findByIdAndUpdate(userId, { avatar: avatarUrl }, { new: true });

        // Create the artist profile with the updated information
        const artistProfile = await createArtistProfile(userId, bio, genres, socialLinks, avatarUrl); // Pass avatarUrl to the service

        res.status(201).json({
            success: true,
            message: 'Artist profile created successfully',
            artist: artistProfile,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Song
export const updateSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const { title, genre, artistId, albumId } = req.body;

        // Find the song
        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        // Check if the current user is the owner (artist) of the song
        if (song.artist.toString() !== artistId) {
            return res.status(403).json({ success: false, message: 'You are not authorized to update this song' });
        }

        // Update song details
        song.title = title || song.title;
        song.genre = genre || song.genre;
        song.album = albumId || song.album;

        // Save updated song
        const updatedSong = await song.save();

        res.status(200).json({
            success: true,
            message: 'Song updated successfully',
            song: updatedSong,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Song update failed: ${error.message}` });
    }
};

// Update Album
export const updateAlbum = async (req, res) => {
    try {
        const { albumId } = req.params;
        const { title, genre, artistId } = req.body;

        // Find the album
        const album = await Album.findById(albumId);

        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }

        /// Fetch the artist associated with the album
        const artist = await ArtistModel.findById(album.artist);

        if (!artist) {
            return res.status(404).json({ success: false, message: "Artist not found" });
        }

        console.log("user id" , req.user._id)
        console.log("artist id" , artist.userId)
        if (req.user._id.toString() !== artist.userId.toString()) {
            return res.status(403).json({ success: false, message: "You are not authorized to update this album" });
        }

        // Update album details
        album.title = title || album.title;
        album.genre = genre || album.genre;

        // Save updated album
        const updatedAlbum = await album.save();

        res.status(200).json({
            success: true,
            message: 'Album updated successfully',
            album: updatedAlbum,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Album update failed: ${error.message}` });
    }
};

// Delete Song
export const deleteSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const artistId = req.user._id; // Assuming you have user ID from the authentication middleware

        // Find the song
        const song = await Song.findById(songId);

        if (!song) {
            return res.status(404).json({ success: false, message: 'Song not found' });
        }

        // Check if the current user is the owner (artist) of the song
        if (song.artist.toString() !== artistId.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this song' });
        }

        // Delete the song from Cloudinary
        const publicId = song.songUrl.split('/').pop().split('.')[0];
        await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' });

        // Delete the song from the database
        await song.remove();

        res.status(200).json({ success: true, message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Song deletion failed: ${error.message}` });
    }
};

// Delete Album
export const deleteAlbum = async (req, res) => {
    try {
        const { albumId } = req.params;
        const artistId = req.user._id;

        // Find the album
        const album = await Album.findById(albumId);

        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }

        // Check if the current user is the owner (artist) of the album
        if (album.artist.toString() !== artistId.toString()) {
            return res.status(403).json({ success: false, message: 'You are not authorized to delete this album' });
        }

        // Delete each song in the album
        const songDeletePromises = album.songs.map(async (songId) => {
            const song = await Song.findById(songId);

            if (song) { // Check if song exists
                // Delete the song from Cloudinary
                const publicId = song.songUrl.split('/').pop().split('.')[0];
                await cloudinary.v2.uploader.destroy(publicId, { resource_type: 'video' });

                // Delete the song from the database
                await song.remove();
            }
        });

        // Wait for all songs to be deleted
        await Promise.all(songDeletePromises);

        // Delete the album itself
        await album.remove();

        res.status(200).json({ success: true, message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: `Album deletion failed: ${error.message}` });
    }
};

