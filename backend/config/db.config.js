import mongoose from 'mongoose';
import { setTimeout } from 'timers/promises';
import dotenv from 'dotenv'; 

dotenv.config(); 
const dbUrl = process.env.MONGO_URI || "";

const connectDb = async () => {
    try {
        const data = await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            socketTimeoutMS: 45000 // Timeout for socket inactivity
        });
        console.log(`Database connected to ${data.connection.host}`);
    } catch (error) {
        console.error("Database connection error:", error.message);
        console.log("Retrying connection in 5 seconds...");

        // Retry connection after 5 seconds
        await setTimeout(5000);
        await connectDb(); // Make sure to await this call
    }
};

export default connectDb;
