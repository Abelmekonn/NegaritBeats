// artistSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    createArtistRequest,
    createArtistSuccess,
    createArtistFailure,
    fetchArtistsRequest,
    fetchArtistsSuccess,
    fetchArtistsFailure,
    fetchArtistByIdRequest,
    fetchArtistByIdSuccess,
    fetchArtistByIdFailure,
} from '../../features/artist/artistSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

// API calls with credentials
const apiCreateArtist = (data) =>
    axios.post(`${API_BASE_URL}artist/create-profile`, data, { withCredentials: true });
const apiFetchArtists = () =>
    axios.get(`${API_BASE_URL}users/all-artists`, { withCredentials: true });
const apiFetchArtistById = (id) =>
    axios.get(`${API_BASE_URL}users/artist-detail/${id}`, { withCredentials: true });

// Worker saga for creating an artist
function* createArtistSaga(action) {
    try {
        const response = yield call(apiCreateArtist, action.payload);
        yield put(createArtistSuccess(response.data));
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to create artist';
        yield put(createArtistFailure(message));
    }
}

// Worker saga for fetching all artists
function* fetchArtistsSaga() {
    try {
        const response = yield call(apiFetchArtists);
        console.log("Fetched artists data:", response.data); // Check structure here
        yield put(fetchArtistsSuccess(response.data));
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch artists';
        yield put(fetchArtistsFailure(message));
    }
}

// Worker saga for fetching artist by ID
function* fetchArtistByIdSaga(action) {
    try {
        const response = yield call(apiFetchArtistById, action.payload);
        yield put(fetchArtistByIdSuccess(response.data));
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch artist by ID';
        yield put(fetchArtistByIdFailure(message));
    }
}

// Watcher saga
function* artistSaga() {
    yield takeLatest(createArtistRequest.type, createArtistSaga);
    yield takeLatest(fetchArtistsRequest.type, fetchArtistsSaga);
    yield takeLatest(fetchArtistByIdRequest.type, fetchArtistByIdSaga);
}

export default artistSaga;
