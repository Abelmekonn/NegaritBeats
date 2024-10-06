import express from 'express';
import { registrationUser, activateUser, loginUser } from '../controllers/user.controller.js'; // Correct the path

const userRouter = express.Router();

// User registration route
userRouter.post('/register', registrationUser);

// User activation route
userRouter.post('/activate', activateUser);

// User login route
userRouter.post('/login', loginUser);

export default userRouter;
