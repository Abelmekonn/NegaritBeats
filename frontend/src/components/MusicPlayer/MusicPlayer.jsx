import React, { useState, useEffect } from 'react';
import { useMusicPlayer } from '../../context/MusicPlayerContext';
import { FaPlayCircle, FaPauseCircle, FaStepForward, FaStepBackward } from 'react-icons/fa';
import { CiShuffle, CiRepeat } from "react-icons/ci";
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

// Custom debounce function
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

const MusicPlayer = () => {
    const { currentTrack, isPlaying, playTrack, pauseTrack, nextTrack, prevTrack, repeatTrack } = useMusicPlayer();

    const [audio, setAudio] = useState(null);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        // Initialize the audio object
        const newAudio = new Audio();
        setAudio(newAudio);

        return () => {
            newAudio.pause();
        };
    }, []);

    useEffect(() => {
        if (audio && currentTrack) {
            // Restore playback state from localStorage
            const savedTrack = JSON.parse(localStorage.getItem('currentTrack'));
            const savedTime = parseFloat(localStorage.getItem('currentTime')) || 0;
            const savedVolume = parseFloat(localStorage.getItem('volume')) || 1;
            const savedMuted = localStorage.getItem('isMuted') === 'true';

            audio.src = currentTrack.songUrl || (savedTrack ? savedTrack.songUrl : '');
            audio.currentTime = savedTime;
            audio.volume = savedVolume;
            setVolume(savedVolume);
            setIsMuted(savedMuted);

            if (savedMuted) audio.volume = 0;

            audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
            audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));

            if (localStorage.getItem('isPlaying') === 'true') {
                audio.play();
                playTrack(currentTrack);
            }

            return () => {
                audio.pause();
                audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
                audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
            };
        }
    }, [audio, currentTrack, playTrack]);

    // Save state to localStorage periodically
    useEffect(() => {
        if (audio) {
            const interval = setInterval(() => {
                localStorage.setItem('currentTime', audio.currentTime);
                localStorage.setItem('volume', audio.volume);
                localStorage.setItem('isMuted', isMuted);
                localStorage.setItem('currentTrack', JSON.stringify(currentTrack));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [audio, currentTrack, isMuted]);

    const handlePlay = () => {
        if (audio) {
            audio.play();
            playTrack(currentTrack);
            localStorage.setItem('isPlaying', true);
        }
    };

    const handlePause = () => {
        if (audio) {
            audio.pause();
            pauseTrack();
            localStorage.setItem('isPlaying', false);
        }
    };

    const handleVolumeChange = debounce((e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audio) audio.volume = newVolume;
        setIsMuted(newVolume === 0);
    }, 200);

    const toggleMute = () => {
        if (audio) {
            setIsMuted(!isMuted);
            audio.volume = isMuted ? volume : 0;
        }
    };

    const handleProgressChange = debounce((e) => {
        const newTime = parseFloat(e.target.value);
        if (audio) {
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    }, 200);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='fixed bottom-0 w-[80%] bg-gray-800'>
            {currentTrack ? (
                <div className='p-4 flex items-center justify-between'>
                    <div className='flex items-center'>
                        <img src={currentTrack.coverImageUrl} alt={currentTrack.title} className='w-16 h-16 object-cover rounded-md' />
                        <div className='ml-4'>
                            <h3 className='text-white'>{currentTrack.title}</h3>
                            <p className='text-gray-400'>{currentTrack.artist?.user?.name || "Unknown Artist"}</p>
                        </div>
                    </div>

                    <div className='w-[50%] flex flex-col justify-center items-center gap-2'>
                        <div className='flex items-center justify-center'>
                            <button className='text-white mx-2'>
                                <CiShuffle size={24} />
                            </button>
                            <button onClick={prevTrack} className='text-white mx-2'>
                                <FaStepBackward size={24} />
                            </button>
                            {isPlaying ? (
                                <button onClick={handlePause} className='text-white mx-2'>
                                    <FaPauseCircle size={24} />
                                </button>
                            ) : (
                                <button onClick={handlePlay} className='text-white mx-2'>
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

                        <div className='flex items-center w-full justify-center'>
                            <span className='text-gray-400 text-sm'>{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min="0"
                                max={duration || 0}
                                value={currentTime}
                                step="0.01"
                                onChange={handleProgressChange}
                                className='mx-2 w-full'
                            />
                            <span className='text-gray-400 text-sm'>{formatTime(duration)}</span>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <button onClick={toggleMute} className='text-white mx-2'>
                            {isMuted ? <GiSpeakerOff size={24} /> : <GiSpeaker size={24} />}
                        </button>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            value={isMuted ? 0 : volume * 100} 
                            onChange={(e) => {
                                const newVolume = parseInt(e.target.value, 10) / 100; 
                                setVolume(newVolume);
                                if (audio) audio.volume = newVolume; 
                                setIsMuted(newVolume === 0);
                            }}
                            className='volume-slider mx-2'
                        />
                    </div>
                </div>
            ) : (
                <p className='text-gray-400 hidden'></p>
            )}
        </div>
    );
};

export default MusicPlayer;
