import React from 'react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import { IoAdd } from 'react-icons/io5';

const musicCovers = [
    { image: cover1, genre: 'Pop' },
    { image: cover2, genre: 'Rock' },
    { image: cover3, genre: 'Jazz' },
    { image: cover4, genre: 'Hip-Hop' },
    { image: cover5, genre: 'Classical' },
];

const MusicGenres = () => {
    return (
        <div className="p-6">
            <h1 className='text-white text-3xl font-bold mb-6'>
                Music <span className='text-pink-500'>Genres</span>
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {musicCovers.map((cover, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                        <img src={cover.image} alt={cover.genre} className="w-full h-auto object-cover" />
                        <div className="absolute bottom-0 z-50 text-center w-full">
                            <h2 className="text-white text-xl font-bold mb-2 text-center">{cover.genre}</h2>
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
};

export default MusicGenres;
