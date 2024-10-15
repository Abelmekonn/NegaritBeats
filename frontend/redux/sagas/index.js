// src/redux/sagas/index.js
import { all } from 'redux-saga/effects';
// import songSaga from './songSaga'; // Import your song saga
// import albumSaga from './albumSaga'; // Import your album saga
// Import other sagas as needed

function* rootSaga() {
    yield all([
        // songSaga(),  // Run the song saga
        // albumSaga(), // Run the album saga
        // Add other sagas here
    ]);
}

export default rootSaga;
