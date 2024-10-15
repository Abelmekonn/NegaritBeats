// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './features';  // Import the root reducer that combines all slices
import rootSaga from './sagas';         // Import the root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
    reducer: rootReducer,  // Use the combined reducers from the rootReducer
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),  // Disable thunk and add saga middleware
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;  // Export the configured store
