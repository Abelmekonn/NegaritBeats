// models/History.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
        required: true,
    },
    playedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('History', historySchema);
