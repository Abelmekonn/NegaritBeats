import React from 'react'
import { FaArrowLeft, FaPlayCircle } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const SingleAlbumBanner = ({ cover, name, artist, totalSongs }) => {
    const navigate = useNavigate(); // Create a navigate function
    return (
        <div>
            <div
                className="p-6 min-h-[60vh] flex justify-between rounded-2xl bg-cover bg-center px-6 relative"
                style={{ backgroundImage: `url(${cover})` }}
            >
                <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
                <div className='z-10 relative text-white'>
                    {/* Add onClick to go back when the arrow is clicked */}
                    <FaArrowLeft size={30} className="cursor-pointer" onClick={() => navigate(-1)} />
                </div>
                <div className="relative h-full w-full md:justify-between space-y-6 flex flex-col md:flex-row self-end items-center z-10">
                    <div className='flex gap-16 justify-between '>
                        <div className='text-white'>
                            <h1 className="text-3xl font-bold ">{name}</h1>
                            <h3 className='text-2xl font-medium'>By : {artist}</h3>
                            <p className='text-xl'>{totalSongs} Songs</p>
                        </div>
                        <div className='flex flex-col justify-center '>

                            <FaPlayCircle className='text-[#EE10B0]' size={60} />
                        </div>
                    </div>
                    <div className="flex justify-between gap-6">
                        <button className="px-12 py-2 rounded-md bg-[#EE10B0] text-white font-medium">
                            Follow
                        </button>
                        <button className="px-12 py-2 text-[#4c3cff] border border-[#4c3cff] hover:bg-[#4c3cff] hover:text-white rounded-md transition-all">
                            Unfollow
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleAlbumBanner