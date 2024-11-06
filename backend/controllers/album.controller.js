import Album from '../models/Album.model.js';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import Song from '../models/Song.model.js';
import { uploadSingleSongToCloudinary } from '../config/cloudinary.config.js';
import ArtistModel from '../models/Artist.model.js';
import { redis } from '../utils/redis.js';
import UserModel from '../models/User.model.js';


export const uploadSingleSong = async (req, res, next) => {
    try {
        const artistId = req.params.artistId; // Get artist ID from URL params
        const { genre, title, coverImage } = req.body; // Extract required fields from request body
        
        // Use req.file for a single file upload
        const songFile = req.file; // This is where the uploaded song file will be

        // Check for missing fields
        if (!songFile) return res.status(400).json({ message: 'Song file is missing' });
        if (!coverImage) return res.status(400).json({ message: 'Cover image data is missing' });
        if (!title) return res.status(400).json({ message: 'Title is missing' });
        if (!genre) return res.status(400).json({ message: 'Genre is missing' });

        // Step 1: Upload song file to Cloudinary
        const songCloud = await uploadSingleSongToCloudinary(songFile.path);

        // Step 2: Decode base64 image data for the cover image and upload it
        const base64Data = coverImage.replace(/^data:image\/\w+;base64,/, ""); // Strip metadata from base64
        const buffer = Buffer.from(base64Data, 'base64'); // Convert base64 to buffer for Cloudinary upload

        cloudinary.uploader.upload_stream(
            {
                folder: "covers", // Specify Cloudinary folder
                resource_type: "image",
                width: 300,
                crop: "scale",
            },
            async (error, coverCloud) => {
                if (error) {
                    console.error('Error uploading cover image:', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Error uploading cover image',
                        error: error.message,
                    });
                }

                // Step 3: Create song record in the database
                const newSong = await createSong(coverCloud, songCloud, title, genre, artistId);

                if (!newSong) {
                    return res.status(500).json({ success: false, message: 'Error creating song' });
                }

                // Step 4: Find artist and update singleSongs array with the new song ID
                const artist = await ArtistModel.findById(artistId);
                if (!artist) {
                    return res.status(404).json({ message: 'Artist not found' });
                }

                artist.singleSongs.push(newSong._id); // Update artist's singleSongs array
                await artist.save(); // Save the updated artist document

                // Response with the new song and updated artist info
                return res.status(201).json({
                    success: true,
                    song: newSong,
                    artist,
                });
            }
        ).end(buffer); // End the stream and pass the buffer for upload

    } catch (error) {
        console.error('Error uploading song:', error);
        return res.status(500).json({
            success: false,
            message: 'Error uploading song',
            error: error.message,
        });
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
        const artistId = req.params.artistId;
        console.log('started')
        const { title, genre, coverImage, songsDetails } = req.body;
        console.log(songsDetails)
        
        // Validate required fields
        if (!title) return res.status(400).json({ message: 'Title is missing' });
        if (!genre) return res.status(400).json({ message: 'Genre is missing' });
        if (!coverImage) return res.status(400).json({ message: 'Cover image data is missing' });
        if (!req.files || req.files.length === 0) return res.status(400).json({ message: 'No songs uploaded' });
        if (!songsDetails) return res.status(400).json({ message: 'Songs details are missing' });

        // Parse songsDetails JSON and validate
        let songsData;
        try {
            songsData = JSON.parse(songsDetails);
            if (!Array.isArray(songsData) || songsData.length !== req.files.length) {
                throw new Error('songsDetails should be a JSON array matching the number of songs uploaded');
            }
        } catch (err) {
            return res.status(400).json({ message: 'Invalid JSON string for songsDetails.' });
        }

        // Upload cover image to Cloudinary
        const base64Data = coverImage.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const coverCloud = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder: "album_covers",
                resource_type: "image",
                width: 300,
                crop: "scale"
            }, (error, result) => error ? reject(error) : resolve(result)
            ).end(buffer);
        });

        // Create the album
        const newAlbum = await Album.create({
            title,
            artist: artistId,
            genre,
            coverImageUrl: coverCloud.secure_url,
        });

        // Upload each song and create Song documents
        const uploadedSongs = await Promise.all(req.files.map(async (songFile, i) => {
            const songData = songsData[i];
            const { title: songTitle, genre: songGenre } = songData;

            if (!songTitle || !songGenre) throw new Error(`Song at index ${i} is missing title or genre`);
            const songCloud = await uploadSingleSongToCloudinary(songFile.path);
            const newSong = await Song.create({
                title: songTitle,
                artist: artistId,
                genre: songGenre,
                songUrl: songCloud.secure_url,
                coverImageUrl: coverCloud.secure_url,
                album: newAlbum._id,
            });

            fs.unlink(songFile.path, (err) => err && console.error(`Error deleting file ${songFile.path}:`, err));
            return newSong;
        }));

        // Link songs to the album and save
        newAlbum.songs = uploadedSongs.map(song => song._id);
        await newAlbum.save();

        // Update the artist's albums array
        const artist = await ArtistModel.findById(artistId);
        if (!artist) return res.status(404).json({ message: 'Artist not found' });
        artist.albums.push(newAlbum._id);
        await artist.save();

        res.status(201).json({ success: true, album: newAlbum, songs: uploadedSongs, artist });
    } catch (error) {
        console.error('Error uploading album:', error);
        return res.status(500).json({ success: false, message: 'Error uploading album', error: error.message });
    }
}

export const getAllSongs = async (req, res, next) => {
    try {
        // Check if the data exists in Redis cache
        const cachedSongs = await redis.get('allSongs');
        
        if (cachedSongs) {
            // If cached data exists, parse and return it
            return res.status(200).json({ success: true, songs: JSON.parse(cachedSongs) });
        }

        // Fetch all songs from the database if not in cache
        const songs = await Song.find().populate('artist', 'name').populate('album', 'title');

        // Store the fetched data in Redis with an expiration time (e.g., 1 hour)
        await redis.set('allSongs', JSON.stringify(songs), 'EX', 3600); // 3600 seconds = 1 hour

        // Return the songs in the response
        res.status(200).json({ success: true, songs });
    } catch (error) {
        console.error('Error fetching songs:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching songs',
            error: error.message,
        });
    }
};

export const getAllAlbums = async (req, res, next) => {
    try {
        // Check if the data exists in Redis cache
        const cachedAlbums = await redis.get('allAlbums');
        
        if (cachedAlbums) {
            // If cached data exists, parse and return it
            return res.status(200).json({ success: true, albums: JSON.parse(cachedAlbums) });
        }

        // Fetch all albums from the database if not in cache
        const albums = await Album.find();

        // Manually populate the artist and user data
        const albumDetails = await Promise.all(albums.map(async (album) => {
            const artist = await ArtistModel.findById(album.artist);
            const user = await UserModel.findById(artist.userId);
            return {
                ...album.toObject(), // Convert album to a plain object
                artist: {
                    _id: artist._id,
                    name: artist.name,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email, // Accessing the user's email
                    },
                },
            };
        }));
        
        // Store the fetched data in Redis with an expiration time (e.g., 1 hour)
        await redis.set('allAlbums', JSON.stringify(albumDetails), 'EX', 3600); // 3600 seconds = 1 hour

        // Return the albums in the response
        res.status(200).json({ success: true, albums: albumDetails });
    } catch (error) {
        console.error('Error fetching albums:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching albums',
            error: error.message,
        });
    }
};

export const getAlbumById = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Check if the album data exists in Redis cache
        const cachedAlbum = await redis.get(`album:${id}`);
        
        if (cachedAlbum) {
            // If cached data exists, parse and return it
            return res.status(200).json({ success: true, album: JSON.parse(cachedAlbum) });
        }

        // Fetch the album from the database if not in cache
        const album = await Album.findById(id);
        
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }

        // Store the fetched album in Redis with an expiration time (e.g., 1 hour)
        await redis.set(`album:${id}`, JSON.stringify(album), 'EX', 3600); // 3600 seconds = 1 hour

        // Return the album in the response
        res.status(200).json({ success: true, album });
    } catch (error) {
        console.error('Error fetching album:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching album',
            error: error.message,
        });
    }
};
