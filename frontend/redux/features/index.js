// src/redux/features/index.js
import { combineReducers } from 'redux';
// import songReducer from './songSlice';   // Import your song slice reducer
// import albumReducer from './albumSlice'; // Import your album slice reducer
// Import other slice reducers as needed

const rootReducer = combineReducers({
    // songs: songReducer,
    // albums: albumReducer,
    // Add other reducers here
});

export default rootReducer;
