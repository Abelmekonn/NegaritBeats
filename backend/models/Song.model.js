// models/Song.js
import mongoose from "mongoose";
const { Schema } = mongoose;

const songSchema = new Schema({
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
    songUrl: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    playCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const  Song = mongoose.model('Song', songSchema);

export default Song;