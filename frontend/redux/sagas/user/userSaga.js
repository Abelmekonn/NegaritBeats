import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';
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
    activateUserRequest,
    activateUserSuccess,
    activateUserFailure,
    resendOtpRequest,
    resendOtpSuccess,
    resendOtpFailure,
    setActivationToken,
    updateAccessTokenRequest,
    updateAccessTokenSuccess,
    updateAccessTokenFailure,
    loadUserRequest,
    loadUserSuccess,
    loadUserFailure,
    updateProfileSuccess,
    updateProfileFail,
    updateProfileRequest,
} from '../../features/user/userSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

// API requests
const apiRegister = (data) => axios.post(`${API_BASE_URL}users/register`, data);
const apiLogin = (data) => axios.post(`${API_BASE_URL}users/login`, data);
const apiLogout = () => axios.post(`${API_BASE_URL}users/logout`);
const apiResendOtp = (data) => axios.post(`${API_BASE_URL}users/resend-otp`, data);
const apiActivate = (data) => axios.post(`${API_BASE_URL}users/activate`, data);
const apiUpdateAccessToken = () => axios.post(`${API_BASE_URL}users/update-token`);

const apiLoadUser = () => {
    return axios.get(`${API_BASE_URL}users/me`, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
};

const apiUpdateProfile = (data) => {
    return axios.put(`${API_BASE_URL}users/profile/update`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    });
};

// Worker saga for user registration
function* registerUserSaga(action) {
    try {
        const response = yield call(apiRegister, action.payload);
        const { activationToken } = response.data;
        yield put(setActivationToken(activationToken));
        yield put(registerUserSuccess(response.data.user));
        toast.success('Registration successful! Please check your email for the activation link.');
    } catch (error) {
        const message = error.response?.data?.message || 'Registration failed';
        yield put(registerUserFailure(message));
        toast.error(message);
    }
}

function* loginUserSaga(action) {
    try {
        const { data } = yield call(apiLogin, action.payload);
        const { user, accessToken, refreshToken } = data;

        // Store tokens and user data in cookies/localStorage
        Cookies.set('access_token', accessToken, { expires: 1 });
        Cookies.set('refresh_token', refreshToken, { expires: 30 });
        // localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);
        Cookies.set('user_data', JSON.stringify(user), { expires: 1 });

        yield put(loginUserSuccess(user));
        toast.success('Login successful!');
        yield put(loadUserRequest()); // Load user data after login
    } catch (error) {
        const message = error.response?.data?.message || 'Login failed. Please check your credentials and try again.';
        yield put(loginUserFailure(message));
        toast.error(message);
    }
}


// Worker saga for user logout
function* logoutUserSaga() {
    try {
        yield call(apiLogout);
        const token=  Cookies.get('access_token');
        console.log(token)

        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        Cookies.remove('user_data');
        
        yield put(logoutUserSuccess());
        toast.success('Logout successful!');
    } 
    catch (error) {
        const message = error.response?.data?.message || 'Logout failed';
        yield put(logoutUserFailure(message));
        toast.error(message);
    }
}

// Worker saga for activating user account
function* activateUserSaga(action) {
    try {
        const { activation_code, activation_token } = action.payload;
        yield call(apiActivate, { activation_code, activation_token });
        yield put(activateUserSuccess());
        toast.success('Account activated successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Activation failed';
        yield put(activateUserFailure(message));
        toast.error(message);
    }
}

// Worker saga for resending OTP
function* resendOtpSaga(action) {
    try {
        const { data } = yield call(apiResendOtp, action.payload);
        yield put(resendOtpSuccess(data));
        toast.success('Activation email has been resent!');
    } catch (error) {
        const message = error.response?.data?.message || 'Resending OTP failed';
        yield put(resendOtpFailure(message));
        toast.error(message);
    }
}

// Worker saga for updating access token
function* updateAccessTokenSaga() {
    try {
        const { data } = yield call(apiUpdateAccessToken);
        Cookies.set('access_token', data.accessToken, { expires: 1 });
        localStorage.setItem('accessToken', data.accessToken);
        yield put(updateAccessTokenSuccess(data.user));
    } catch (error) {
        const message = error.response?.data?.message || 'Token refresh failed';
        yield put(updateAccessTokenFailure(message));
        toast.error(message);
    }
}

function* loadUserSaga() {
    try {
        const { data } = yield call(apiLoadUser);
        yield put(loadUserSuccess(data.user));
    } catch (error) {
        console.error('Error loading user:', error.response); // Log the full error response
        const message = error.response?.data?.message || 'Loading user failed';
        yield put(loadUserFailure(message));
        toast.error(message);
    }
}


// Worker saga for updating user profile
function* updateProfileSaga(action) {
    try {
        const response = yield call(apiUpdateProfile, action.payload);
        const { user } = response.data;
        yield put(updateProfileSuccess(user));
        toast.success('Profile updated successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Profile update failed';
        yield put(updateProfileFail(message));
        toast.error(message);
    }
}

// Watcher saga
function* userSaga() {
    yield takeLatest(registerUserRequest.type, registerUserSaga);
    yield takeLatest(loginUserRequest.type, loginUserSaga);
    yield takeLatest(logoutUserRequest.type, logoutUserSaga);
    yield takeLatest(activateUserRequest.type, activateUserSaga);
    yield takeLatest(resendOtpRequest.type, resendOtpSaga);
    yield takeLatest(updateAccessTokenRequest.type, updateAccessTokenSaga);
    yield takeLatest(loadUserRequest.type, loadUserSaga);
    yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}

export default userSaga;
