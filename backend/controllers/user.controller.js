import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js'; // Import your user model
import CatchAsyncError from '../middleware/CatchAsyncError.js'; // Async error wrapper
import sendMail from '../utils/sendMail.js'; // Utility for sending emails
import { sendToken } from '../utils/jwt.js'; // Utility for sending JWT tokens

// Register user
export const registrationUser = CatchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if the email already exists
    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
        return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // User object without types
    const user = { name, email, password };

    // Create activation token
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    // Prepare data for email
    const data = { user: { name: user.name }, activationCode };

    try {
        // Send activation email
        await sendMail({
            email: user.email,
            subject: "Activate your account",
            template: "activation-mail.ejs", // Email template
            data,
        });

        // Respond with success
        res.status(201).json({
            success: true,
            message: `Please check your email: ${user.email} to activate your account!`,
            activationToken: activationToken.token,
        });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
});

// Create activation token (JWT token)
const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });

    return { token, activationCode };
};

// Activate user
export const activateUser = CatchAsyncError(async (req, res, next) => {
    const { activation_token, activation_code } = req.body;

    if (!activation_token) {
        return res.status(400).json({ success: false, message: "Activation token is missing" });
    }

    // Verify the activation token
    let newUser;
    try {
        newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid activation token" });
    }

    // Check if activation code matches
    if (newUser.activationCode !== activation_code) {
        return res.status(400).json({ success: false, message: "Invalid activation code" });
    }

    const { name, email, password } = newUser.user;

    // Check if the user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
        return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Create new user
    await userModel.create({ name, email, password });

    res.status(201).json({
        success: true,
        message: "User activated successfully!",
    });
});

// Login user
export const loginUser = CatchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await user.comparePassword(password); // Assuming you have a method to compare passwords
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Send token
    sendToken(user, 200, res);
});
