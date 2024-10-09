import { approveArtist } from "../services/admin.service.js";

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
