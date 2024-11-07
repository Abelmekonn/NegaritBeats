// src/redux/sagas/songSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    uploadSongRequest,
    uploadSongSuccess,
    uploadSongFailure,
    fetchSongsStart,
    fetchSongsSuccess,
    fetchSongsFailure
} from '../../features/Song/songSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/';

// API request for uploading a song
const apiUploadSong = (artistId, formData) => {
    return axios.post(`${API_BASE_URL}artist/upload-song/${artistId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    });
};

// API request for fetching all songs
const apiFetchSongs = () => axios.get(`${API_BASE_URL}users/songs`, { withCredentials: true });

function* uploadSongSaga(action) {
    const { artistId, formData } = action.payload;
    console.log('Artist ID:', artistId);
    
    try {
        const response = yield call(apiUploadSong, artistId, formData);
        yield put(uploadSongSuccess(response.data));
        toast.success('Song uploaded successfully!');
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to upload song';
        yield put(uploadSongFailure(message));
        toast.error(message);
    }
}

function* fetchSongsSaga() {
    try {
        const response = yield call(apiFetchSongs);
        console.log(response)
        yield put(fetchSongsSuccess(response.data));
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch songs';
        yield put(fetchSongsFailure(message));
        toast.error(message);
    }
}

// Watcher saga
function* songSaga() {
    yield takeLatest(uploadSongRequest.type, uploadSongSaga);
    yield takeLatest(fetchSongsStart.type, fetchSongsSaga);
}

export default songSaga;
