// src/redux/sagas/albumSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    uploadAlbumRequest,
    uploadAlbumSuccess,
    uploadAlbumFailure,
} from '../../features/album/albumSlice'; // Adjust the import path as necessary

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

// API request for uploading an album
const apiUploadAlbum = (artistId, formData) => {
    return axios.post(`${API_BASE_URL}artist/upload-album/${artistId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    });
};

function* uploadAlbumSaga(action) {
    const { artistId, formData } = action.payload;
    console.log('Artist ID:', artistId);

    try {
        const response = yield call(apiUploadAlbum, artistId, formData);
        yield put(uploadAlbumSuccess(response.data));
        toast.success('Album uploaded successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to upload album';
        yield put(uploadAlbumFailure(message));
        toast.error(message);
    }
}

// Watcher saga
function* albumSaga() {
    yield takeLatest(uploadAlbumRequest.type, uploadAlbumSaga);
}

export default albumSaga;
