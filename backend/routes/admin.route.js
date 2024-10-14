import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth.middleware.js";
import { approveArtistController, deleteArtistById, deleteUserById, getAllUsers, getUserById } from "../controllers/admin.controller.js";

const adminRoute = express.Router();

// Use :artistId to capture the dynamic parameter in the URL
adminRoute.put('/approve_artist/:artistId', isAuthenticated, authorizeRoles("admin"), approveArtistController);

// get all users 
adminRoute.get('/all-users',isAuthenticated,authorizeRoles("admin"),getAllUsers)
// get user by id 
adminRoute.get('/user/:userId',isAuthenticated,authorizeRoles("admin"),getUserById)

//delete user 
adminRoute.delete('/delete-user/:userId',isAuthenticated,authorizeRoles("admin"),deleteUserById)

//delete artist 
adminRoute.delete('/delete-user/:artistId',isAuthenticated,authorizeRoles("admin"),deleteArtistById)

export default adminRoute;
