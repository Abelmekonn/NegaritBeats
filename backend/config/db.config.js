import mongoose from 'mongoose';
import { setTimeout } from 'timers/promises';
import dotenv from 'dotenv'; 

dotenv.config(); 
const dbUrl = process.env.MONGO_URI || "";

const connectDb = async () => {
    try {
        const data = await mongoose.connect(dbUrl);
        console.log(`Database connected to ${data.connection.host}`);
    } catch (error) {
        console.log("Database connection error:", error.message);
        console.log("Retrying connection in 5 seconds...");

        // Retry connection after 5 seconds
        await setTimeout(5000);
        connectDb();
    }
};

export default connectDb;
