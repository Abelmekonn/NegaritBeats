import React, { createContext, useState, useContext } from 'react';

// Create the context
const MusicPlayerContext = createContext();

// Custom hook to use the MusicPlayerContext
export const useMusicPlayer = () => useContext(MusicPlayerContext);

// Context provider component
export const MusicPlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Functions to control the music player
    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const pauseTrack = () => {
        setIsPlaying(false);
    };

    const nextTrack = () => {
        // Logic for playing the next track
    };

    const prevTrack = () => {
        // Logic for playing the previous track
    };

    const repeatTrack = () => {
        // Logic for repeating the current track
    };

    return (
        <MusicPlayerContext.Provider
            value={{ currentTrack, isPlaying, playTrack, pauseTrack, nextTrack, prevTrack, repeatTrack }}
        >
            {children}
        </MusicPlayerContext.Provider>
    );
};

export default MusicPlayerContext;
