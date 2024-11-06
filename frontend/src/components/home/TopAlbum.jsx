// src/components/TopAlbum.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsStart } from "../../../redux/features/album/albumSlice";
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Function to truncate title to a specified number of characters
const truncateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};

const TopAlbum = () => {
    const dispatch = useDispatch();
    const { albums, loading, error } = useSelector((state) => state.album);

    useEffect(() => {
        dispatch(fetchAlbumsStart());
    }, [dispatch]);

    console.log(albums);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Top <span className='text-pink-500'>Albums</span>
            </h1>
            <div>
                <div className='grid xl:grid-cols-4 grid-cols-3 gap-4 mt-7'>
                    {albums?.albums?.map((album, index) => (
                        <div key={index} className='bg-[#333] p-2 rounded-lg group relative'>
                            <img src={album.coverImageUrl} alt={album.title} className='w-full h-40 object-cover rounded-lg' />
                            <h2 className='text-white text-xl font-semibold mt-4'>{truncateTitle(album.title, 15)}</h2>
                            <p className='text-gray-400'>{album.artist?.user?.name || 'Unknown Artist'}</p>
                            <div
                                className='absolute bottom-4 right-4 p-2 bg-[#00000080] rounded-full cursor-pointer hidden group-hover:flex items-center justify-center'
                            >
                                <Link to={`/album/${album._id}`}>
                                    <FaPlay size={20} className='text-pink-500' />
                                </Link>
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

export default TopAlbum;
