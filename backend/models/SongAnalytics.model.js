// models/SongAnalytics.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const songAnalyticsSchema = new Schema({
    song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    playCount: {
        type: Number,
        default: 0,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    shareCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('SongAnalytics', songAnalyticsSchema);
