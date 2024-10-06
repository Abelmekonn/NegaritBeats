// models/Artist.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    genres: [String],
    socialLinks: {
        instagram: String,
        twitter: String,
        youtube: String,
        facebook: String,
    },
    image: String, // URL to artist's image (e.g., from Cloudinary)
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'Album',
    }],
    singleSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    isApproved: {
        type: Boolean,
        default: false, // Set to false initially
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Artist', artistSchema);
