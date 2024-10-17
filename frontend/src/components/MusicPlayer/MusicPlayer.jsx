import React, { useState, useEffect } from 'react';
import { useMusicPlayer } from '../../context/MusicPlayerContext';
import { FaPlayCircle, FaPauseCircle, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { CiShuffle, CiRepeat } from "react-icons/ci";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

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

    // State for managing volume and mute
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    
    // State for tracking current time and duration
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (currentTrack) {
            // Assuming `currentTrack.audio` is an HTMLAudioElement
            const audio = currentTrack.audio;
            
            // const updateTime = () => setCurrentTime(audio.currentTime);
            // const setTotalDuration = () => setDuration(audio.duration);

            // Add event listeners to update time and duration
            // audio.addEventListener('timeupdate', updateTime);
            // audio.addEventListener('loadedmetadata', setTotalDuration);

            // Cleanup listeners
            return () => {
                // audio.removeEventListener('timeupdate', updateTime);
                // audio.removeEventListener('loadedmetadata', setTotalDuration);
            };
        }
    }, [currentTrack]);

    // Handle volume change
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (newVolume === '0') {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    // Toggle mute/unmute
    const toggleMute = () => {
        if (isMuted) {
            setIsMuted(false);
            setVolume(1);
        } else {
            setIsMuted(true);
            setVolume(0);
        }
    };

    // Convert seconds to MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Handle track progress
    const handleProgressChange = (e) => {
        const newTime = e.target.value;
        const audio = currentTrack.audio;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className='fixed bottom-0 w-[80%] bg-gray-800 p-4'>
            {currentTrack ? (
                <div className='flex items-center justify-between'>
                    {/* Track details */}
                    <div className='flex items-center '>
                        <img src={currentTrack.cover} alt={currentTrack.title} className='w-16 h-16 object-cover rounded-md' />
                        <div className='ml-4'>
                            <h3 className='text-white'>{currentTrack.title}</h3>
                            <p className='text-gray-400'>{currentTrack.artist}</p>
                        </div>
                    </div>

                    {/* Player controls */}
                    <div className='w-[50%] flex flex-col justify-center item-center self-center gap-2'>
                        <div className='flex items-center justify-center'>
                            <button className='text-white mx-2'>
                                <CiShuffle size={24} />
                            </button>
                            <button onClick={prevTrack} className='text-white mx-2'>
                                <FaStepBackward size={24} />
                            </button>
                            {isPlaying ? (
                                <button onClick={pauseTrack} className='text-white mx-2'>
                                    <FaPauseCircle size={24} />
                                </button>
                            ) : (
                                <button onClick={playTrack} className='text-white mx-2'>
                                    <FaPlayCircle size={24} />
                                </button>
                            )}
                            <button onClick={nextTrack} className='text-white mx-2'>
                                <FaStepForward size={24} />
                            </button>
                            <button onClick={repeatTrack} className='text-white mx-2'>
                                <CiRepeat size={24} />
                            </button>
                        </div>

                        {/* Progress bar with time */}
                        <div className='flex items-center w-full justify-center'>
                            <span className='text-gray-400 text-sm'>{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                value={currentTime}
                                step="0.01"
                                onChange={handleProgressChange}
                                className='mx-2 w-full'
                            />
                            <span className='text-gray-400 text-sm'>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Volume control */}
                    <div className='flex items-center'>
                        <button onClick={toggleMute} className='text-white mx-2'>
                            {isMuted ? (
                                <GiSpeakerOff size={24} />
                            ) : (
                                <GiSpeaker size={24} />
                            )}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className='volume-slider mx-2'
                        />
                    </div>
                </div>

            ) : (
                <p className='text-gray-400'>No track selected</p>
            )}
        </div>
    );
};

export default MusicPlayer;
