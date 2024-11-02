// src/redux/slices/songSlice.js
import { createSlice } from '@reduxjs/toolkit';

const songSlice = createSlice({
    name: 'song',
    initialState: {
        uploadingSong: false,
        uploadSuccess: false,
        uploadError: null,
    },
    reducers: {
        uploadSongRequest: (state) => {
            state.uploadingSong = true;
            state.uploadSuccess = false;
            state.uploadError = null;
        },
        uploadSongSuccess: (state) => {
            state.uploadingSong = false;
            state.uploadSuccess = true;
            state.uploadError = null; // Clear any previous errors on success
        },
        uploadSongFailure: (state, action) => {
            state.uploadingSong = false;
            state.uploadSuccess = false;
            state.uploadError = action.payload; // Capture error message
        },
        resetUploadState: (state) => { // Optional: Reset state for a new upload
            state.uploadingSong = false;
            state.uploadSuccess = false;
            state.uploadError = null;
        },
    },
});

// Export actions
export const {
    uploadSongRequest,
    uploadSongSuccess,
    uploadSongFailure,
    resetUploadState, // Export reset action if needed
} = songSlice.actions;

// Export the reducer
export default songSlice.reducer;
