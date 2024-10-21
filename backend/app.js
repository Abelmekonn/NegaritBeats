import express from 'express'; // Use ES module syntax
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ErrorHandler from './utils/errorHandler.js'; // Custom error handler
import userRouter from './routes/user.route.js'; // Import your user routes
import artistRouter from './routes/artis.route.js'; // Fixed typo in filename
import adminRoute from './routes/admin.route.js';

const app = express();


// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(cookieParser()); // Parse cookies
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your client URL
    credentials: true, // Allow credentials (cookies)
}));

// Routes
app.use('/api/users', userRouter); // User-related routes
app.use('/api/artist', artistRouter); // Artist-related routes
app.use('/api/admin', adminRoute); // Admin-related routes

app.options('*', cors()); // Enable pre-flight for all routes

// Error handling middleware
app.use(ErrorHandler); // Handle errors

// Export the app
export { app };
