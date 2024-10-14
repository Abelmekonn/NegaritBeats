import Album from "../models/Album.model.js";
import CommentModel from "../models/Comment.model.js";
import Song from "../models/Song.model.js";
import { fetchCommentsWithCache } from "../services/comment.service.js";

// Add a comment to a song or album
export const addComment = async (req, res) => {
    const { userId, content, songId, albumId } = req.body;

    try {
        // Ensure either songId or albumId is provided
        if (!songId && !albumId) {
            return res.status(400).json({
                success: false,
                message: 'Either songId or albumId must be provided',
            });
        }

        // Ensure content and userId are provided
        if (!content || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Content and userId are required',
            });
        }

        // Create the comment
        const newComment = new CommentModel({
            user: userId,
            song: songId || null,
            album: albumId || null,
            content,
        });

        // Save the comment
        const savedComment = await newComment.save();

        // If the comment is for a song, update the song's comment array
        if (songId) {
            const song = await Song.findById(songId);
            if (!song) {
                return res.status(404).json({ success: false, message: 'Song not found' });
            }

            song.comments.push(savedComment._id); // Add comment ID to song's comments
            await song.save();
        }

        // If the comment is for an album, update the album's comment array
        if (albumId) {
            const album = await Album.findById(albumId);
            if (!album) {
                return res.status(404).json({ success: false, message: 'Album not found' });
            }

            album.comments.push(savedComment._id); // Add comment ID to album's comments
            await album.save();
        }

        return res.status(201).json({
            success: true,
            message: 'Comment added successfully',
            comment: savedComment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to add comment: ${error.message}`,
        });
    }
};

// Fetch comments for a song or album
export const getCommentsForItem = async (req, res) => {
    const { songId, albumId } = req.params;

    try {
        let comments;

        // Check if the request is for a song
        if (songId) {
            comments = await fetchCommentsWithCache(songId, true);
        }

        // Check if the request is for an album
        if (albumId) {
            comments = await fetchCommentsWithCache(albumId, false);
        }

        return res.status(200).json({
            success: true,
            comments
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Error fetching comments: ${error.message}` });
    }
};