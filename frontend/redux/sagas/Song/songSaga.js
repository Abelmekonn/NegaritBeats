// src/redux/sagas/artistSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { uploadSongRequest, uploadSongSuccess, uploadSongFailure } from '../../features/Song/songSlice';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/';

function* handleUploadSong(action) {
    try {
        const { artistId, formData } = action.payload; // Expecting `artistId` and `formData`
        
        // Ensure the URL matches the backend route
        const response = yield call(() =>
            axios.post(`${API_BASE_URL}artist/upload-song/${artistId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        );
        
        yield put(uploadSongSuccess(response.data));
    } catch (error) {
        yield put(uploadSongFailure(error.response?.data?.message || 'Failed to upload song'));
    }
}

function* artistSaga() {
    yield takeLatest(uploadSongRequest.type, handleUploadSong);
}

export default artistSaga;
