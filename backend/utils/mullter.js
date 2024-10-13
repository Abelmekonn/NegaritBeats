// config/multer.js
import multer from 'multer';

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// Initialize Multer with the storage configuration
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit per file
}).array('songs', 10); // Accept up to 10 songs

export default upload;
