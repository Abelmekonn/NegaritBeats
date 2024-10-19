import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
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
} from '../../features/user/userSlice';

// Load backend API URL from environment variable
const API_BASE_URL =  import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

// API requests
const apiRegister = (data) => axios.post(`${API_BASE_URL}user/register`, data);
const apiLogin = (data) => axios.post(`${API_BASE_URL}user/login`, data);
const apiLogout = () => axios.post(`${API_BASE_URL}user/logout`);
const apiGetProfile = () => axios.get(`${API_BASE_URL}user/profile`);
const apiActivate = (token) => axios.post(`${API_BASE_URL}user/activate`, { token });

// Worker saga: handle registration
function* registerUserSaga(action) {
    try {
        const response = yield call(apiRegister, action.payload);
        yield put(registerUserSuccess(response.data));
    } catch (error) {
        yield put(registerUserFailure(error.response?.data?.message || 'Registration failed'));
    }
}

// Worker saga: handle login
function* loginUserSaga(action) {
    try {
        const response = yield call(apiLogin, action.payload);
        yield put(loginUserSuccess(response.data));
    } catch (error) {
        yield put(loginUserFailure(error.response?.data?.message || 'Login failed'));
    }
}

// Worker saga: handle logout
function* logoutUserSaga() {
    try {
        yield call(apiLogout);
        yield put(logoutUserSuccess());
    } catch (error) {
        yield put(logoutUserFailure(error.response?.data?.message || 'Logout failed'));
    }
}

// Worker saga: handle get profile
function* getProfileSaga() {
    try {
        const response = yield call(apiGetProfile);
        yield put(getProfileSuccess(response.data));
    } catch (error) {
        yield put(getProfileFailure(error.response?.data?.message || 'Fetching profile failed'));
    }
}

// New: Worker saga for account activation
function* activateUserSaga(action) {
    try {
        const response = yield call(apiActivate, action.payload);  // payload contains the activation token
        yield put(activateUserSuccess());
    } catch (error) {
        yield put(activateUserFailure(error.response?.data?.message || 'Activation failed'));
    }
}

// Watcher saga: listen for actions
function* userSaga() {
    yield takeLatest(registerUserRequest.type, registerUserSaga);
    yield takeLatest(loginUserRequest.type, loginUserSaga);
    yield takeLatest(logoutUserRequest.type, logoutUserSaga);
    yield takeLatest(getProfileRequest.type, getProfileSaga);
    yield takeLatest(activateUserRequest.type, activateUserSaga);  // Listen for activation request
}

export default userSaga;
