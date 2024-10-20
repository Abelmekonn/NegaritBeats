import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,
    loginUserRequest,
    loginUserSuccess,
    loginUserFailure,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailure,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
    activateUserRequest,
    activateUserSuccess,
    activateUserFailure,
    resendOtpRequest,
    resendOtpSuccess,
    resendOtpFailure,
    setActivationToken,
} from '../../features/user/userSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

// API requests
const apiRegister = (data) => axios.post(`${API_BASE_URL}users/register`, data);
const apiLogin = (data) => axios.post(`${API_BASE_URL}users/login`, data);
const apiLogout = () => axios.post(`${API_BASE_URL}users/logout`);
const apiGetProfile = () => axios.get(`${API_BASE_URL}users/profile`);
const apiResendOtp = (data) => axios.post(`${API_BASE_URL}users/resend-otp`, data);
const apiActivate = (data) => axios.post(`${API_BASE_URL}users/activate`, data);

// Worker saga for user registration
function* registerUserSaga(action) {
    try {
        const response = yield call(apiRegister, action.payload);
        const { activationToken } = response.data; // Extract the activationToken
        console.log(response.data)
        // Dispatch action to store the activation token
        yield put(setActivationToken(activationToken));
        yield put(registerUserSuccess()); // Dispatch success action
        toast.success('Registration successful! Please check your email for the activation link.');
    } catch (error) {
        const message = error.response?.data?.message || 'Registration failed';
        yield put(registerUserFailure(message)); // Dispatch failure action
        toast.error(message);
    }
}

// Worker saga for user login
function* loginUserSaga(action) {
    try {
        const { data } = yield call(apiLogin, action.payload);
        yield put(loginUserSuccess(data)); // Dispatch success action with user data
        toast.success('Login successful!');
    } catch (error) {
        const message = error.response?.data?.message || 'Login failed';
        yield put(loginUserFailure(message)); // Dispatch failure action
        toast.error(message);
    }
}

// Worker saga for user logout
function* logoutUserSaga() {
    try {
        yield call(apiLogout); // Call API for logout
        yield put(logoutUserSuccess()); // Dispatch success action
        toast.success('Logout successful!');
    } catch (error) {
        const message = error.response?.data?.message || 'Logout failed';
        yield put(logoutUserFailure(message)); // Dispatch failure action
        toast.error(message);
    }
}

// Worker saga for getting user profile
function* getProfileSaga() {
    try {
        const { data } = yield call(apiGetProfile); // Call API to get user profile
        yield put(getProfileSuccess(data)); // Dispatch success action with user profile data
    } catch (error) {
        const message = error.response?.data?.message || 'Fetching profile failed';
        yield put(getProfileFailure(message)); // Dispatch failure action
        toast.error(message);
    }
}

// Worker saga for activating user account
function* activateUserSaga(action) {
    try {
        const { activation_code, activation_token } = action.payload;

        console.log('Activating user with:', { activation_code, activation_token });
        yield call(apiActivate, { activation_code, activation_token }); // Call API to activate user
        yield put(activateUserSuccess()); // Dispatch success action
        toast.success('Account activated successfully!');
    } catch (error) {
        console.error('Error response:', error.response); // Log the error response
        const message = error.response?.data?.message || 'Activation failed';
        yield put(activateUserFailure(message)); // Dispatch failure action
        toast.error(message);
    }
}

// Worker saga for resending OTP
function* resendOtpSaga(action) {
    try {
        const { data } = yield call(apiResendOtp, action.payload); // Call API to resend OTP
        yield put(resendOtpSuccess(data)); // Dispatch success action
        toast.success('Activation email has been resent!');
    } catch (error) {
        const message = error.response?.data?.message || 'Resending OTP failed';
        yield put(resendOtpFailure(message)); // Dispatch failure action
        toast.error(message);
    }
}

// Watcher saga
function* userSaga() {
    yield takeLatest(registerUserRequest.type, registerUserSaga);
    yield takeLatest(loginUserRequest.type, loginUserSaga);
    yield takeLatest(logoutUserRequest.type, logoutUserSaga);
    yield takeLatest(getProfileRequest.type, getProfileSaga);
    yield takeLatest(activateUserRequest.type, activateUserSaga);
    yield takeLatest(resendOtpRequest.type, resendOtpSaga);
}

export default userSaga;
