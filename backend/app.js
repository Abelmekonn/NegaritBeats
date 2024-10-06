import express from 'express'; // Use ES module syntax
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ErrorHandler from './utils/errorHandler.js'; // Custom error handler
import userRouter from './routes/user.route.js'; // Import your user routes

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cookieParser()); // Parse cookies
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from your client URL
    credentials: true, // Allow credentials (cookies)
}));

// Routes
app.use('/api/users', userRouter); // User-related routes

// Error handling middleware
app.use(ErrorHandler); // Handle errors

// Export the app
export { app };
