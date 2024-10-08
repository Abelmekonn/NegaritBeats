import express from 'express';
import { registrationUser, activateUser, loginUser,getUserProfile,updateProfile } from '../controllers/user.controller.js'; // Correct the path
import { isAuthenticated } from '../middleware/auth.middleware.js';
const userRouter = express.Router();

// User registration route
userRouter.post('/register', registrationUser);

// User activation route
userRouter.post('/activate', activateUser);

// User login route
userRouter.post('/login', loginUser);

// Get profile (protected route)
userRouter.get('/profile', isAuthenticated, getUserProfile);

// Update profile (protected route)
userRouter.put('/profile/update', isAuthenticated, updateProfile);


export default userRouter;
