// models/Album.js
import mongoose from "mongoose";
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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
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

const Album = mongoose.models.Album || mongoose.model('Album', albumSchema);

export default Album;
