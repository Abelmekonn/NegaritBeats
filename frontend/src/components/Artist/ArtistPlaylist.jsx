import React from 'react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import { IoAdd } from 'react-icons/io5';

const playlists = [
    {
        image: cover1,
        title: "Full collection",
    },
    {
        image: cover2,
        title: "Best of artist",
    },
    {
        image: cover3,
        title: "Old Song's",
    },
    {
        image: cover4,
        title: "New Release",
    },
    {
        image: cover5,
        title: "Fan's Favorites",
    },
];

const ArtistPlaylist = () => {
    return (
        <div className='flex flex-col gap-6'>
            <h1 className='text-white text-3xl font-bold'>
                Artist <span className='text-pink-500'>Playlist</span>
            </h1>
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 mt-4">
                {playlists.map((playlist, index) => (
                    <div key={index} className='rounded-lg overflow-hidden shadow-lg bg-gray-800'>
                        <img
                            src={playlist.image}
                            alt={playlist.title}
                            className='w-full h-40 object-cover'
                        />
                        <div className='p-4'>
                            <h2 className='text-white text-lg font-semibold'>{playlist.title}</h2>
                        </div>
                    </div>
                ))}
                <div className='col-span-1 flex justify-center items-center'>
                    <div className=' text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-slate-800 shadow-slate-800 cursor-pointer hover:bg-pink-600 transition-all'>
                        <IoAdd size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistPlaylist;
