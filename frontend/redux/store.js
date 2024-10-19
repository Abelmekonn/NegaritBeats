import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './features/user/userSlice';
import userSaga from './sagas/user/userSaga';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with saga middleware and user reducer
const store = configureStore({
    reducer: {
        user: userReducer, // Add user reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false, // Disable thunk as we are using saga
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

// Run the saga middleware
sagaMiddleware.run(userSaga);

export default store;
