// src/redux/slices/artistSlice.js
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
        },
        uploadSongFailure: (state, action) => {
            state.uploadingSong = false;
            state.uploadSuccess = false;
            state.uploadError = action.payload;
        },
    },
});

export const { uploadSongRequest, uploadSongSuccess, uploadSongFailure } = songSlice.actions;

export default songSlice.reducer;
