import React from 'react';
import { useMusicPlayer } from '../../context/MusicPlayerContext'; // Get the global state for the player

const MusicPlayer = () => {
    const { currentTrack } = useMusicPlayer(); // Get the currently playing track

    if (!currentTrack) return null; // Return nothing if no track is playing

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg z-50">
            <div>
                <h4 className="text-lg font-bold">{currentTrack.name}</h4>
                <p>{currentTrack.artist}</p>
            </div>
            <audio controls src={currentTrack.src} className="w-1/2" />
        </div>
    );
};

export default MusicPlayer;
