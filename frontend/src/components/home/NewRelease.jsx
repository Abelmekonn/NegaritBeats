import React, { useContext, useEffect } from 'react';
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from "react-icons/fa";
import MusicPlayerContext from '../../context/MusicPlayerContext'; // Import the context
import { fetchSongsStart } from '../../../redux/features/Song/songSlice';
import { useDispatch, useSelector } from 'react-redux';

// Function to truncate title to 40 characters
const truncateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

const NewRelease = () => {
    const { playTrack } = useContext(MusicPlayerContext); // Access playTrack from context
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector((state) => state.songs);

    useEffect(() => {
        dispatch(fetchSongsStart());
    }, [dispatch]);

    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                New Release <span className='text-pink-500'>Songs</span>
            </h1>
            <div>
                <div className='grid md:grid-cols-6 grid-cols-3 gap-4 mt-7'>
                    {songs && songs.songs && songs.songs.slice(0, 5).map((song, index) => ( // Only display the first 5 songs
                        <div key={index} className='bg-[#333] p-2 rounded-lg relative group'>
                            <img 
                                src={song.coverImageUrl} 
                                alt={song.title} 
                                className='w-full h-40 object-cover rounded-lg' 
                            />
                            <h2 className='text-white text-xl font-semibold mt-4'>
                                {truncateTitle(song.title, 15)}
                            </h2>
                            <p className='text-gray-400'>{song.artist.user.name}</p>
                            {/* Play button becomes visible on hover */}
                            <div 
                                className='text-pink-600 absolute bottom-4 right-4 p-2 bg-[#00000080] rounded-full cursor-pointer hidden group-hover:flex items-center justify-center'
                                onClick={() => playTrack(song)} // Pass the song to playTrack on click
                            >
                                <FaPlay size={20} />
                            </div>
                        </div>
                    ))}
                    {/* Add New Button */}
                    <div className='col-span-1 flex justify-center items-center'>
                        <div className='text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-slate-800 shadow-slate-800 cursor-pointer hover:bg-pink-600 transition-all'>
                            <IoAdd size={30} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewRelease;
