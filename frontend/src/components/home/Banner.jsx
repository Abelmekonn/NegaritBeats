import React from 'react';
import banner from '../../assets/banner/banner4.jpg';
import { Link } from 'react-router-dom'

function Banner() {
    return (
        <div
            className='min-h-[90vh] rounded-2xl bg-cover bg-center px-6 relative'
            style={{ backgroundImage: `url(${banner})` }}
        >
            <div className='absolute inset-0 bg-black opacity-30 rounded-2xl' />
            {/* Add any additional content you want here */}
            <div className='w-1/2 absolute top-1/3 gap-6 flex flex-col'>
                <h1 className='text-white text-6xl font-bold'>All the <span className='text-pink-500'>Best Songs</span> <br />
                    in One place
                </h1>
                <p className='text-gray-300 text-lg font-semibold'>
                    On our website, you can access an amazing  collection of songs from all over the world. Stream your  favorite music and discover new artists and genres. Whatever  your taste in music, you'll find it here.
                </p>
                <div className='flex justify-between w-3/4'>
                    <Link to='/discover' className='flex flex-col justify-center'>
                        <button className='px-12 py-2 rounded-md bg-[#EE10B0]'>
                            <p className='text-white font-medium text-center'>Discover Now</p>
                        </button>
                    </Link>
                    <Link to='/create-playlist' className='flex flex-col justify-center'>
                        <button className='px-12 text-[#4c3cff]  py-2 border hover:text-white border-[#4c3cff] hover:bg-[#4c3cff] rounded-md transition-all'>
                            <p className='font-medium text-center'>Create playlist</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Banner;