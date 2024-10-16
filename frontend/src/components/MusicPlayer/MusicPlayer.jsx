// src/components/MusicPlayer/MusicPlayer.jsx
import React from 'react';
import { useMusicPlayer } from '../../context/MusicPlayerContext'; // Correct import
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRedo } from 'react-icons/fa'; // Import necessary icons

const MusicPlayer = () => {
    const {
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
        nextTrack,
        prevTrack,
        repeatTrack,
    } = useMusicPlayer(); // Access current track and controls

    return (
        <div className='fixed bottom-0 w-[80%] bg-gray-800 p-4'>
            {currentTrack ? (
                <div className='flex items-center gap-60'>
                    <div className='flex items-center'>
                        <img src={currentTrack.cover} alt={currentTrack.title} className='w-16 h-16 object-cover rounded-md' />
                        <div className='ml-4'>
                            <h3 className='text-white'>{currentTrack.title}</h3>
                            <p className='text-gray-400'>{currentTrack.artist}</p>
                        </div>
                    </div>
                    <div className='flex items-center self-center'>
                        <button onClick={prevTrack} className='text-white mx-2'>
                            <FaStepBackward size={24} />
                        </button>
                        {isPlaying ? (
                            <button onClick={pauseTrack} className='text-white mx-2'>
                                <FaPause size={24} />
                            </button>
                        ) : (
                            <button onClick={playTrack} className='text-white mx-2'>
                                <FaPlay size={24} />
                            </button>
                        )}
                        <button onClick={nextTrack} className='text-white mx-2'>
                            <FaStepForward size={24} />
                        </button>
                        <button onClick={repeatTrack} className='text-white mx-2'>
                            <FaRedo size={24} />
                        </button>
                    </div>
                </div>

            ) : (

                <p className='text-gray-400'></p>
            )}
        </div>
    );
};

export default MusicPlayer;
