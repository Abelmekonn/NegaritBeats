// src/redux/sagas/albumSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    uploadAlbumRequest,
    uploadAlbumSuccess,
    uploadAlbumFailure,
    fetchAlbumsStart,
    fetchAlbumsSuccess,
    fetchAlbumsFailure,
    fetchAlbumByIdRequest,
    fetchAlbumByIdSuccess,
    fetchAlbumByIdFailure,
} from '../../features/album/albumSlice'; // Adjust the import path as necessary

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

// API request for uploading an album
const apiUploadAlbum = (artistId, formData) => {
    return axios.post(`${API_BASE_URL}artist/upload-album/${artistId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    });
};

// API request for fetching all albums
const apiFetchAlbums = () => axios.get(`${API_BASE_URL}users/albums`, { withCredentials: true });

// API request for fetching an album by ID
const apiFetchAlbumById = (id) => {
    return axios.get(`${API_BASE_URL}users/albums/${id}`, {
        withCredentials: true,
    });
};

function* uploadAlbumSaga(action) {
    const { artistId, formData } = action.payload;
    console.log('Artist ID:', artistId);
    console.log('FormData:', Array.from(formData.entries())); 

    try {
        const response = yield call(apiUploadAlbum, artistId, formData);
        yield put(uploadAlbumSuccess(response.data));
        toast.success('Album uploaded successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to upload album';
        yield put(uploadAlbumFailure(message));
        console.error("Error details:", error.response.data);
        toast.error(message);
    }
}

function* fetchAlbumsSaga() {
    try {
        const response = yield call(apiFetchAlbums);
        console.log(response)
        yield put(fetchAlbumsSuccess(response.data));
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch albums';
        yield put(fetchAlbumsFailure(message));
        toast.error(message);
    }
}

function* fetchAlbumByIdSaga(action) {
    try {
        const response = yield call(apiFetchAlbumById, action.payload);
        yield put(fetchAlbumByIdSuccess(response.data.album));
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch album';
        yield put(fetchAlbumByIdFailure(message));
    }
}

// Watcher saga
function* albumSaga() {
    yield takeLatest(uploadAlbumRequest.type, uploadAlbumSaga);
    yield takeLatest(fetchAlbumByIdRequest.type, fetchAlbumByIdSaga);
    yield takeLatest(fetchAlbumsStart.type, fetchAlbumsSaga); // Watch fetchAlbumsStart
}

export default albumSaga;
