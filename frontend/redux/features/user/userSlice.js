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
        // Load user actions
        loadUserRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        loadUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Update access token actions
        updateAccessTokenRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateAccessTokenSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload; // Update user after refreshing token
        },
        updateAccessTokenFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
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
        // Token verification actions
        verifyTokenRequest: (state) => {
            state.loading = true; // Set loading state
            state.error = null; // Reset error
        },
        verifyTokenSuccess: (state) => {
            state.loading = false; // Stop loading
            state.isAuthenticated = true; // User is authenticated
        },
        verifyTokenFailure: (state, action) => {
            state.loading = false; // Stop loading
            state.isAuthenticated = false; // User is not authenticated
            state.error = action.payload; // Store error message
        },
        // Profile update actions
        updateProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        resetError(state) {
            state.error = null;
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
    loadUserRequest,
    loadUserSuccess,
    loadUserFailure,
    updateAccessTokenRequest,
    updateAccessTokenSuccess,
    updateAccessTokenFailure,
    activateUserRequest,
    activateUserSuccess,
    activateUserFailure,
    resendOtpRequest,
    resendOtpSuccess,
    resendOtpFailure,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    setActivationToken,
    verifyTokenRequest,
    verifyTokenSuccess,
    verifyTokenFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    resetError,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
