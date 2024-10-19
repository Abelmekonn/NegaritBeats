import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

// Create user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Registration actions
        registerUserRequest: (state) => {
            state.loading = true;
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        registerUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Login actions
        loginUserRequest: (state) => {
            state.loading = true;
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loginUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Activation actions
        activateUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        activateUserSuccess: (state) => {
            state.loading = false;
            state.activationSuccess = true;
        },
        activateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Logout actions
        logoutUserRequest: (state) => {
            state.loading = true;
        },
        logoutUserSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        },
        logoutUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Get/Update Profile actions
        getProfileRequest: (state) => {
            state.loading = true;
        },
        getProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        getProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export actions
export const {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    activateUserRequest,
    activateUserSuccess,
    activateUserFailure,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
