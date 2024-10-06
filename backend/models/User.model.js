const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'artist', 'user'],
        default: 'user',
    },
    likedSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    dislikedSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    favoriteSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }],
    playlists: [{
        name: {
            type: String,
            required: true,
        },
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'Song',
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    followingArtists: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
    }],
    isPremium: {
        type: Boolean,
        default: false,
    },
    subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema);
