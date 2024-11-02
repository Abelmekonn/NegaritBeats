// src/redux/slices/albumSlice.js
import { createSlice } from '@reduxjs/toolkit';

const albumSlice = createSlice({
    name: 'album',
    initialState: {
        uploadingAlbum: false,
        uploadSuccess: false,
        uploadError: null,
    },
    reducers: {
        uploadAlbumRequest: (state) => {
            state.uploadingAlbum = true;
            state.uploadSuccess = false;
            state.uploadError = null;
        },
        uploadAlbumSuccess: (state) => {
            state.uploadingAlbum = false;
            state.uploadSuccess = true;
            state.uploadError = null; // Clear any previous errors on success
        },
        uploadAlbumFailure: (state, action) => {
            state.uploadingAlbum = false;
            state.uploadSuccess = false;
            state.uploadError = action.payload; // Capture error message
        },
        resetUploadState: (state) => { // Optional: Reset state for a new upload
            state.uploadingAlbum = false;
            state.uploadSuccess = false;
            state.uploadError = null;
        },
    },
});

// Export actions
export const {
    uploadAlbumRequest,
    uploadAlbumSuccess,
    uploadAlbumFailure,
    resetUploadState, // Export reset action if needed
} = albumSlice.actions;

// Export the reducer
export default albumSlice.reducer;
