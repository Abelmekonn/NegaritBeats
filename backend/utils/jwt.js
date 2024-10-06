require("dotenv").config();
const { Response } = require("express");
const { redis } = require("./redis");
const User = require("../models/User.model"); // Assuming you have a user model in JS


// Options for cookies
const accessTokenOptions = {
    expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    maxAge: 15 * 60 * 1000, // 15 minutes
    httpOnly: true,
    sameSite: "lax",
    secure: false, // Ensure this is false in non-HTTPS environments
};

const refreshTokenOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: "lax",
    secure: false, // Ensure this is false in non-HTTPS environments
};

const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    // Store user session in Redis
    redis.set(user._id.toString(), JSON.stringify(user));

    // Set cookies
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        refreshToken,
    });
};

module.exports = { sendToken };
