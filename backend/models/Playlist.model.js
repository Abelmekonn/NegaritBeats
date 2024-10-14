// models/Playlist.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Playlist', playlistSchema);
