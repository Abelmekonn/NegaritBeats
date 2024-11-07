// artistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const artistSlice = createSlice({
    name: 'artist',
    initialState: {
        artists: [],
        currentArtist: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Actions for adding an artist
        createArtistRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createArtistSuccess: (state, action) => {
            state.loading = false;
            state.artists.push(action.payload);
        },
        createArtistFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Actions for fetching all artists
        fetchArtistsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchArtistsSuccess: (state, action) => {
            state.loading = false;
            state.artists = action.payload;
        },
        fetchArtistsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // Actions for fetching an artist by ID
        fetchArtistByIdRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchArtistByIdSuccess: (state, action) => {
            state.loading = false;
            state.currentArtist = action.payload;
        },
        fetchArtistByIdFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    createArtistRequest,
    createArtistSuccess,
    createArtistFailure,
    fetchArtistsRequest,
    fetchArtistsSuccess,
    fetchArtistsFailure,
    fetchArtistByIdRequest,
    fetchArtistByIdSuccess,
    fetchArtistByIdFailure,
} = artistSlice.actions;

export default artistSlice.reducer;
