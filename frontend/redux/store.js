import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './features/user/userSlice';
import albumReducer from './features/album/albumSlice';
import artistReducer from './features/artist/artistSlice'
import songReducer from './features/Song/songSlice'
import userSaga from './sagas/user/userSaga';
import songSaga from './sagas/Song/songSaga';
import artistSaga from './sagas/Artist/artistSaga';
import { all } from 'redux-saga/effects'; // Import `all`
import albumSaga from './sagas/Album/albumSaga';
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);0

const store = configureStore({
  reducer: {
    user: persistedReducer,
    album: albumReducer,
    songs: songReducer,
    artist: artistReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Run both sagas
function* rootSaga() {
  yield all([
      userSaga(),
      songSaga(), // Adwd songSaga here
      albumSaga(),
      artistSaga()
  ]);
}

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);
export default store; // Ensure store is exported as default
