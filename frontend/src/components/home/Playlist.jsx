import React, { useContext } from 'react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from "react-icons/fa"; // Import play icon
import MusicPlayerContext from '../../context/MusicPlayerContext'; // Import context

// List of playlists
const playlists = [
    {
        cover: cover1,
        title: "Sad Playlist",
        artist: "Various Artists" // Add artist name to be consistent with context
    },
    {
        cover: cover2,
        title: "Chill Vibes",
        artist: "Various Artists"
    },
    {
        cover: cover3,
        title: "Workout Mix",
        artist: "Various Artists"
    },
    {
        cover: cover4,
        title: "Party Hits",
        artist: "Various Artists"
    },
    {
        cover: cover5,
        title: "Relaxing Tunes",
        artist: "Various Artists"
    },
];

const Playlist = () => {
    const { playTrack } = useContext(MusicPlayerContext); // Access playTrack from context

    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-white text-3xl font-bold'>
                Mood <span className='text-pink-500'>Playlist</span>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 mt-4">
                {playlists.map((playlist, index) => (
                    <div key={index} className='relative rounded-lg overflow-hidden shadow-lg bg-gray-800 group'>
                        <img
                            src={playlist.cover}
                            alt={playlist.title}
                            className='w-full h-40 object-cover'
                        />
                        <div className='p-4'>
                            <h2 className='text-white text-lg font-semibold'>{playlist.title}</h2>
                        </div>
                        {/* Play button becomes visible on hover */}
                        <div 
                            className='absolute bottom-4 right-4 p-2 bg-[#00000080] rounded-full cursor-pointer hidden group-hover:flex items-center justify-center'
                            onClick={() => playTrack(playlist)} // Pass the playlist to the player context
                        >
                            <FaPlay size={20} className='text-pink-500' />
                        </div>
                    </div>
                ))}
                {/* Add New Button */}
                <div className='col-span-1 flex justify-center items-center'>
                    <div className=' text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-slate-800 shadow-slate-800 cursor-pointer hover:bg-pink-600 transition-all'>
                        <IoAdd size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
