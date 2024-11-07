import { all } from 'redux-saga/effects';
import userSaga from './user/userSaga'; // Import user saga
import songSaga from './Song/songSaga';
import albumSaga from './Album/albumSaga';
import artistSaga from './Artist/artistSaga';
// Root saga to combine all sagas
function* rootSaga() {
    yield all([
        userSaga(),   // Run the user saga
        songSaga(),  // Example of song saga (add when needed)
        albumSaga(), // Example of album saga (add when needed)
        artistSaga() // Example of artist saga (add when needed)
    ]);
}

export default rootSaga;
