import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { IoAdd } from 'react-icons/io5';
import { fetchArtistsRequest } from '../../../redux/features/artist/artistSlice';
import { FcApproval } from "react-icons/fc";

const AllArtists = () => {
    const dispatch = useDispatch();
    const { artists } = useSelector((state) => state.artist);

    console.log(artists)

    useEffect(() => {
        dispatch(fetchArtistsRequest());
    }, [dispatch]);
    return (
        <div className="p-6">
            <h1 className='text-white text-3xl font-bold mb-6'>
                Top Followed <span className='text-pink-500'>Artists</span>
            </h1>
            <div className='w-full mb-4 items-end flex justify-end gap-3'>
                <input type="text"
                    className='py-3 pr-10 pl-4 w-80 rounded-lg bg-gray-800 text-gray-50 placeholder-gray-300 focus:outline-none'
                    placeholder='Search An Artists' />
                <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold
                py-3 px-4 rounded">
                    search
                </button>
            </div>
            <div className="flex flex-col space-y-4">
                <div className={`flex items-center p-4 rounded-lg`}>
                    <span className="text-white mr-10"></span>
                    <span className='w-20'></span>
                    <div className="flex w-full justify-between">
                        <h2 className="text-white">Artist Name</h2>
                        <p className="text-gray-300">Albums</p>
                        <p className="text-gray-300">Followers</p>
                        <p className="text-gray-300">Genre</p>
                        <p className="text-gray-300">Likes</p>
                    </div>
                </div>
                {artists.data.map((artist, index) => (
                    <div key={artist._id} className={`flex items-center p-4 rounded-lg bg-gray-800`}>
                        <span className="text-white mr-4">#</span>
                        <Link to={`/artist/${artist._id}`}>
                            <img src={artist.userId.avatar.url} alt={artist.name} className="w-20 h-20 rounded-lg mr-4 cursor-pointer" />
                        </Link>
                        <div className="flex w-full justify-between">
                            <h2 className="text-white flex gap-1 items-center">{artist.userId.name}{artist.isApproved && <FcApproval />} </h2>
                            <p className="text-gray-300">{artist.albums.length}</p>
                            <p className="text-gray-300">{artist.followers.length}</p>
                            <p className="text-gray-300">{artist.genre}</p>
                            <p className="text-gray-300">{artist.totalLikes}</p>
                        </div>
                    </div>
                ))}
                <div className='w-full flex justify-center mt-5'>
                    <button className='flex bg-gray-800 py-2 px-4 rounded-lg text-white items-center'>
                        <IoAdd size={30} /> Show More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllArtists;
