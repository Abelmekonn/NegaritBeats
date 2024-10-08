import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js'; // Import your user model
import catchAsyncError from '../middleware/CatchAsyncError.js'; // Async error wrapper
import sendMail from '../utils/sendMail.js'; // Utility for sending emails
import { sendToken } from '../utils/jwt.js'; // Utility for sending JWT tokens
import * as userService from '../services/user.service.js'; 
import cloudinary from 'cloudinary';
import { redis } from '../utils/redis.js';



