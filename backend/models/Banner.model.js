// models/Banner.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerSchema = new Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    redirectUrl: String,
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: Date,
    isActive: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Banner', bannerSchema);
