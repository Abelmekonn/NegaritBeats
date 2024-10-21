import mongoose from 'mongoose'; // Import Mongoose
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for token generation

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
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
    avatar: {
        public_id: {
            type: String,
            default: "avatars/y58icrh8ipwidybzav2b"
        },
        url: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/diwkuzhxf/image/upload/v1728498939/avatars/y58icrh8ipwidybzav2b.jpg", // Default avatar URL
        }, // This will store the URL of the profile picture
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

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Sign access token
userSchema.methods.SignAccessToken = function () {
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '5', 10); // in minutes
    return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || '', {
        expiresIn: accessTokenExpire * 60 // Convert minutes to seconds
    });
};

// Sign refresh token
userSchema.methods.SignRefreshToken = function () {
    const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '59', 10); // in days
    return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || '', {
        expiresIn: refreshTokenExpire * 24 * 60 * 60 // Convert days to seconds
    });
};

// Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel; // Export the User model
