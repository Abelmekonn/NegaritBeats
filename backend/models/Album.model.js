// models/Album.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    genre: {
        type: String,
        required: true,
        trim: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    releaseDate: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Album', albumSchema);
