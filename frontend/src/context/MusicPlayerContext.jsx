import React, { createContext, useState, useContext } from 'react';

// Create a context for the music player
const MusicPlayerContext = createContext();

export const useMusicPlayer = () => useContext(MusicPlayerContext);

export const MusicPlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null); // Store the currently playing track

    const playTrack = (track) => {
        setCurrentTrack(track);
    };

    return (
        <MusicPlayerContext.Provider value={{ currentTrack, playTrack }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};
