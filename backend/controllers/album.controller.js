import Album from '../models/Album.model.js';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import Song from '../models/Song.model.js';
import { uploadSingleSongToCloudinary } from '../config/cloudinary.config.js';
import ArtistModel from '../models/Artist.model.js';


export const uploadSingleSong = async (req, res, next) => {
    try {
        const artistId = req.params.artistId; // Get the artist ID from the URL params
        const { genre, title, coverImage } = req.body; // Extract title, genre, and coverImage from the request body

        const songFile = req.files.songFile ? req.files.songFile[0] : undefined; // Ensure song file is present

        if (!songFile) {
            return res.status(400).json({ message: 'Song file is missing' });
        }
        if (!coverImage) {
            return res.status(400).json({ message: 'Cover image data is missing' });
        }
        if (!title) {
            return res.status(400).json({ message: 'Title is missing' });
        }
        if (!genre) {
            return res.status(400).json({ message: 'Genre is missing' });
        }

        // Upload song file to Cloudinary
        const songCloud = await uploadSingleSongToCloudinary(songFile.path);

        // Decode the base64 image data for the cover image
        const base64Data = coverImage.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        // Upload cover image to Cloudinary
        cloudinary.uploader.upload_stream({
            folder: "covers", // Specify folder for cover images
            resource_type: "image",
            width: 300,
            crop: "scale"
        }, async (error, coverCloud) => {
            if (error) {
                console.error('Error uploading cover image:', error);
                return res.status(500).json({ success: false, message: 'Error uploading cover image', error: error.message });
            }

            // Create the song after the cover image has been uploaded
            const newSong = await createSong(coverCloud, songCloud, title, genre, artistId);

            if (newSong) {
                // Find the artist and update their singleSongs array
                const artist = await ArtistModel.findById(artistId);
                if (!artist) {
                    return res.status(404).json({ message: 'Artist not found' });
                }

                artist.singleSongs.push(newSong._id); // Add the new song ID to the artist's singleSongs array
                await artist.save(); // Save the updated artist document

                // Respond with the new song and updated artist info
                res.status(201).json({
                    success: true,
                    song: newSong,
                    artist,
                });
            }
        }).end(buffer); // Pass the buffer to Cloudinary for the cover image upload

    } catch (error) {
        console.error('Error uploading song:', error);
        return res.status(500).json({ success: false, message: 'Error uploading song', error: error.message });
    }
};

// Refactor the createSong function to return the new song
const createSong = async (coverCloud, songCloud, title, genre, artistId) => {
    try {
        // Create and return the new song
        const newSong = await Song.create({
            title,
            artist: artistId,
            genre,
            songUrl: songCloud.secure_url, // URL of the uploaded song
            coverImageUrl: coverCloud.secure_url, // URL of the uploaded cover image
        });
        return newSong;
    } catch (error) {
        console.error('Error creating song:', error);
        throw new Error('Error creating song');
    }
};

export const uploadAlbum = async (req, res, next) => {
    try {
        const artistId = req.params.artistId; // Get the artist ID from URL params
        const { title, genre, coverImage, songsDetails } = req.body; // Extract required fields
        
        console.log('Request Body:', req.body);
        console.log('Uploaded Files:', req.files);
        
        // Validate required fields
        if (!title) {
            return res.status(400).json({ message: 'Title is missing' });
        }
        if (!genre) {
            return res.status(400).json({ message: 'Genre is missing' });
        }
        if (!coverImage) {
            return res.status(400).json({ message: 'Cover image data is missing' });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No songs uploaded' });
        }
        if (!songsDetails) {
            return res.status(400).json({ message: 'Songs details are missing' });
        }

        let songsData;
        try {
            songsData = JSON.parse(songsDetails);
            console.log('Number of uploaded songs:', req.files.length);
            console.log('Number of songs in songsDetails:', songsData.length);
            if (!Array.isArray(songsData) || songsData.length !== req.files.length) {
                throw new Error('songsDetails should be a JSON array matching the number of songs uploaded');
            }
        } catch (err) {
            console.error('Error parsing songsDetails:', err);
            return res.status(400).json({ message: 'Invalid JSON string for songsDetails.' });
        }

        // Upload cover image to Cloudinary
        const base64Data = coverImage.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        const coverCloud = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: "album_covers", // Specify folder for album covers
                resource_type: "image",
                width: 300,
                crop: "scale"
            }, (error, result) => {
                if (error) {
                    console.error('Error uploading album cover image:', error);
                    return reject(error);
                }
                resolve(result);
            }).end(buffer);
        });

        // Create the album
        const newAlbum = await Album.create({
            title,
            artist: artistId,
            genre,
            coverImageUrl: coverCloud.secure_url, // URL of the uploaded cover image
        });

        // Upload each song and create Song documents
        const uploadedSongs = await Promise.all(req.files.map(async (songFile, i) => {
            const songData = songsData[i];
            const { title: songTitle, genre: songGenre } = songData;

            // Validate song details
            if (!songTitle || !songGenre) {
                console.error(`Song at index ${i} is missing title or genre`);
                throw new Error(`Song at index ${i} is missing title or genre`);
            }

            // Upload song file to Cloudinary
            const songCloud = await uploadSingleSongToCloudinary(songFile.path);

            // Create a Song document
            const newSong = await Song.create({
                title: songTitle,
                artist: artistId,
                genre: songGenre,
                songUrl: songCloud.secure_url, // URL of the uploaded song
                coverImageUrl: coverCloud.secure_url, // Use the album cover image for each song
                album: newAlbum._id, // Associate song with the album
            });

            // Cleanup: Delete the uploaded song file from local storage
            fs.unlink(songFile.path, (err) => {
                if (err) console.error(`Error deleting file ${songFile.path}:`, err);
            });

            return newSong; // Return the created song document
        }));

        // Update the album with the uploaded song IDs
        newAlbum.songs = uploadedSongs.map(song => song._id);
        await newAlbum.save();

        // Find and update the artist's albums array
        const artist = await ArtistModel.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        artist.albums.push(newAlbum._id); // Add the new album ID to the artist's albums array
        await artist.save();

        // Send the final response with the album and associated songs
        res.status(201).json({
            success: true,
            album: newAlbum,
            songs: uploadedSongs,
            artist
        });

    } catch (error) {
        console.error('Error uploading album:', error);
        return res.status(500).json({ success: false, message: 'Error uploading album', error: error.message });
    }
}
