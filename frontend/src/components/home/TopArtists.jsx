import React from 'react';
import artist1 from '../../assets/artist/artist1.jpg';
import artist2 from '../../assets/artist/artist2.jpg';
import artist3 from '../../assets/artist/artist3.jpg';
import artist4 from '../../assets/artist/artist4.jpg';
import artist5 from '../../assets/artist/artist5.jpg';
import artist6 from '../../assets/artist/artist6.jpg';
import { IoAdd } from 'react-icons/io5';

// Array of top artists
const artists = [
    {
        image: artist1,
        name: "Eminem"
    },
    {
        image: artist2,
        name: "Taylor Swift"
    },
    {
        image: artist3,
        name: "Drake"
    },
    {
        image: artist4,
        name: "Rihanna"
    },
    {
        image: artist5,
        name: "Adele"
    },
    {
        image: artist6,
        name: "Beyoncé"
    }
];

const TopArtists = () => {
    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Popular <span className='text-pink-500'>Artists</span>
            </h1>
            <div className='grid md:grid-cols-7 grid-cols-2  md:gap-3 mt-7'>
                {artists.map((artist, index) => (
                    <div key={index} className=' rounded-lg text-center'>
                        <img
                            src={artist.image}
                            alt={artist.name}
                            className='w-40 h-40 object-cover rounded-full'
                        />
                        <h2 className='text-white text-xl font-semibold mt-4'>{artist.name}</h2>
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

export default TopArtists;
