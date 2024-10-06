// models/Subscription.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    planType: {
        type: String,
        enum: ['free', 'monthly', 'yearly'],
        default: 'free',
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
