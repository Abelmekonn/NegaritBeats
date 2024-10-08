import userModel from '../models/user.model.js'; // Import your user model
import * as userService from '../services/user.service.js'; 

// Manage Playlists

export const getAllPlaylists = async (req, res) => {
    try {
        const userId = req.user._id;
        const playlists = await userService.getUserPlaylists(userId);
        
        res.status(200).json({
            success: true,
            playlists,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const createPlaylist = async (req, res) => {
    const userId = req.user._id;
    const { name, songs } = req.body; // `songs` is an array of song IDs

    const user = await userModel.findById(userId);
    user.playlists.push({ name, songs });

    await user.save();
    
    res.status(201).json({
        success: true,
        message: "Playlist created successfully",
        user,
    });
};

export const addSongToPlaylist = async (req, res) => {
    const userId = req.user._id;
    const { playlistId, songId } = req.body;

    const user = await userModel.findById(userId);
    const playlist = user.playlists.id(playlistId);
    if (playlist && !playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Song added to playlist",
        user,
    });
};

export const removeSongFromPlaylist = async (req, res) => {
    const userId = req.user._id;
    const { playlistId, songId } = req.body;

    const user = await userModel.findById(userId);
    const playlist = user.playlists.id(playlistId);
    if (playlist) {
        playlist.songs = playlist.songs.filter(
            (id) => id.toString() !== songId
        );
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Song removed from playlist",
        user,
    });
};

export const deletePlaylist = async (req, res) => {
    const userId = req.user._id;
    const { playlistId } = req.body;

    const user = await userModel.findById(userId);
    user.playlists = user.playlists.filter(
        (playlist) => playlist._id.toString() !== playlistId
    );

    await user.save();

    res.status(200).json({
        success: true,
        message: "Playlist deleted successfully",
        user,
    });
};
