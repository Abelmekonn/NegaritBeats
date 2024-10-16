import React, { useContext } from 'react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa'; // Import play icon
import MusicPlayerContext from '../../context/MusicPlayerContext'; // Import context

// Function to truncate title to 40 characters
const truncateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

const songs = [
    {
        title: "Lost in Paradise",
        artist: "Rima",
        cover: cover1
    },
    {
        title: "Dreamers' Symphony",
        artist: "Aria",
        cover: cover2
    },
    {
        title: "Echoes of Love",
        artist: "Elyas",
        cover: cover3
    },
    {
        title: "Neon Skies",
        artist: "Sasha Grey",
        cover: cover4
    },
    {
        title: "Midnight Sun",
        artist: "Zayne",
        cover: cover5
    }
];

const SingleSongs = () => {
    const { playTrack } = useContext(MusicPlayerContext); // Access playTrack from context

    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Single <span className='text-pink-500'>Songs</span>
            </h1>
            <div>
                <div className='grid grid-cols-6 gap-4 mt-7'>
                    {songs.map((song, index) => (
                        <div key={index} className='bg-[#333] p-2 rounded-lg relative group'>
                            <img src={song.cover} alt={song.title} className='w-full h-40 object-cover rounded-lg' />
                            <h2 className='text-white text-xl font-semibold mt-4'>{truncateTitle(song.title, 15)}</h2>
                            <p className='text-gray-400'>{song.artist}</p>
                            {/* Play button becomes visible on hover */}
                            <div 
                                className='text-pink-600 absolute bottom-4 right-4 p-2 bg-[#00000080] rounded-full cursor-pointer hidden group-hover:flex items-center justify-center'
                                onClick={() => playTrack(song)} // Pass the song to the player context
                            >
                                <FaPlay size={20} />
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
        </div>
    );
};

export default SingleSongs;
