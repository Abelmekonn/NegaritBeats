import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    activationSuccess: false,
    activationToken: null, // Add activationToken to the state
};

// Create user slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Registration actions
        registerUserRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
        },
        registerUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload; // Store user info after successful registration
            state.isAuthenticated = true; // Set authenticated state
        },
        registerUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
        },

        // Login actions
        loginUserRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
        },
        loginUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload; // Store user info after successful login
            state.isAuthenticated = true; // Set authenticated state
        },
        loginUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
        },
        
        // New action to set activation token
        setActivationToken: (state, action) => {
            state.activationToken = action.payload; // Store the activation token
        },

        // Activation actions
        activateUserRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
            state.activationSuccess = false; // Reset success state
            state.activationToken = null; // Reset activation token
        },
        activateUserSuccess: (state, action) => {
            state.loading = false;
            state.activationSuccess = true; // Set success state to true
            state.user = { ...state.user, isActivated: true }; // Update user state if needed
        },
        activateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
        },

        // Resend OTP actions
        resendOtpRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
        },
        resendOtpSuccess: (state) => {
            state.loading = false;
            // You can add any additional logic needed on successful resend
        },
        resendOtpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
        },

        // Logout actions
        logoutUserRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
        },
        logoutUserSuccess: (state) => {
            state.loading = false;
            state.user = null; // Clear user info on logout
            state.isAuthenticated = false; // Set authenticated state to false
        },
        logoutUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
        },

        // Get/Update Profile actions
        getProfileRequest: (state) => {
            state.loading = true;
            state.error = null; // Reset error on new request
        },
        getProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload; // Store user profile data
        },
        getProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message
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
    resendOtpRequest, // Exporting resend OTP actions
    resendOtpSuccess,
    resendOtpFailure,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
    setActivationToken, // Export the action to set activation token
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
