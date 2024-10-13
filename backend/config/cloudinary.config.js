import cloudinary from 'cloudinary';

// Assuming you've already configured Cloudinary elsewhere in your project
export const uploadSingleSongToCloudinary = async (filePath) => {
    return await cloudinary.v2.uploader.upload(filePath, {
        resource_type: "auto", // Use auto to detect file type (audio/image)
        folder: "songs" // Folder where songs will be uploaded
    });
};
