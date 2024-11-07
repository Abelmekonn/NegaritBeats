import { combineReducers } from 'redux';
import userReducer from './user/userSlice';   // Import the user slice reducer
import songReducer from './Song/songSlice'
import albumReducer from "./album/albumSlice"
import artistsReducer from './artist/artistSlice'

const rootReducer = combineReducers({
    user: userReducer,   // Add the user reducer here
    songs: songReducer,    // Add other reducers as needed in the future
    albums: albumReducer,  // Example of album reducer
    artists:artistsReducer 
});


export default rootReducer;