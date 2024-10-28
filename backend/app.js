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
    origin: 'http://localhost:5173', // Client URL
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Pre-flight options for CORS
app.options('*', cors());

// Routes
app.use('/api/users', userRouter);
app.use('/api/artist', artistRouter);
app.use('/api/admin', adminRoute);

// Error handling middleware
app.use(ErrorHandler);

// Export the app
export { app };