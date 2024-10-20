import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './features/user/userSlice'; // Import your user reducer
import userSaga from './sagas/user/userSaga';       // Import your user saga

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with saga middleware and user reducer
const store = configureStore({
    reducer: {
        user: userReducer, // Add user reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false, // Disable redux-thunk
            serializableCheck: false, // Disabling serializable check (for actions with non-serializable data)
        }).concat(sagaMiddleware), // Add saga middleware
});

// Run the saga middleware
sagaMiddleware.run(userSaga); // Run the user saga

export default store;
