import dotenv from 'dotenv'; // Import dotenv using ES module syntax
import { app } from './app.js'; // Import the app instance
import connectDb from './config/db.config.js'; // Import database connection function
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary

// Load environment variables
dotenv.config();

// Connect to Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

// Connect to the database
connectDb();

// Start the server
const PORT = process.env.PORT || 8000; // Fallback to port 5000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
