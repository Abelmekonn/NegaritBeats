// models/Genre.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const genreSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Genre', genreSchema);
