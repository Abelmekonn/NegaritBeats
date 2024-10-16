import React from 'react'
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import cover6 from '../../assets/cover/cover6.jpg';
import { IoAdd } from 'react-icons/io5';

// Function to truncate title to 40 characters
const truncateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

const songs = [
    {
        title: "Lost in Paradise",
        artist: "Rima",
        coverImg: cover1
    },
    {
        title: "Dreamers' Symphony",
        artist: "Aria",
        coverImg: cover2
    },
    {
        title: "Echoes of Love",
        artist: "Elyas",
        coverImg: cover3
    },
    {
        title: "Neon Skies",
        artist: "Sasha Grey",
        coverImg: cover4
    },
    {
        title: "Midnight Sun",
        artist: "Zayne",
        coverImg: cover5
    },
    // {
    //     title: "Waves of Serenity",
    //     artist: "Luna",
    //     coverImg: cover6
    // }
];

const TopAlbum = () => {
    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Top <span className='text-pink-500'>Albums</span>
            </h1>
            <div>
                <div className='grid grid-cols-6 gap-4 mt-7'>
                    {songs.map((song, index) => (
                        <div key={index} className='bg-[#333] p-2 rounded-lg'>
                            <img src={song.coverImg} alt={song.title} className='w-full h-40 object-cover rounded-lg' />
                            <h2 className='text-white text-xl font-semibold mt-4'>{truncateTitle(song.title, 15)}</h2>
                            <p className='text-gray-400'>{song.artist}</p>
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
    )
}

export default TopAlbum