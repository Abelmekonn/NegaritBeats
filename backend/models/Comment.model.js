// models/Comment.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Comment', commentSchema);
