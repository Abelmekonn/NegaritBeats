// src/redux/sagas/songSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    uploadSongRequest,
    uploadSongSuccess,
    uploadSongFailure,
} from '../../features/Song/songSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

// API request for uploading a song
const apiUploadSong = (artistId, formData) => {
    return axios.post(`${API_BASE_URL}artist/upload-song/${artistId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    });
};

function* uploadSongSaga(action) {
    console.log('Upload Song Action:', action); // Log the action received
    try {
        const { artistId, formData } = action.payload; 
        console.log('Artist ID:', artistId);
        console.log('Form Data:', formData);

        const response = yield call(apiUploadSong, artistId, formData);
        yield put(uploadSongSuccess(response.data));
        toast.success('Song uploaded successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to upload song';
        yield put(uploadSongFailure(message));
        toast.error(message);
    }
}


// Watcher saga
function* songSaga() {
    yield takeLatest(uploadSongRequest.type, uploadSongSaga);
}

export default songSaga;
