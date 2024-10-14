import { approveArtist, deleteArtistByIdFromDatabase, deleteUserByIdFromDatabase, getAllUsersWithCache } from "../services/admin.service.js";

export const approveArtistController = async (req, res) => {
    try {
        const { artistId } = req.params; // Get artistId from the request parameters
        const artist = await approveArtist(artistId); // Call the approveArtist function

        res.status(200).json({
            success: true,
            message: "Artist approved successfully",
            artist,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteArtistById = async (req, res) => {
    const { artistId } = req.params; // Get artist ID from route parameters

    try {
        const result = await deleteArtistByIdFromDatabase(artistId);

        return res.status(200).json({
            success: true,
            message: 'Artist deleted successfully',
            result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersWithCache();
        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params; // Get user ID from route parameters

    try {
        const user = await getUserByIdWithCache(id);
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteUserById = async (req, res) => {
    const { id } = req.params; // Get user ID from route parameters

    try {
        const result = await deleteUserByIdFromDatabase(id);

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};