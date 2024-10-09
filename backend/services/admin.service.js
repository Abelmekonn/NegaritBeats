import ArtistModel from "../models/Artist.model.js";

export const approveArtist = async (artistId) => {
    const artist = await ArtistModel.findById(artistId);
    if (!artist) {
        throw new Error("Artist not found.");
    }
    artist.isApproved = true;
    
    await artist.save();

    return artist;
};

