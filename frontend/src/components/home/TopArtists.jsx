import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoAdd } from 'react-icons/io5';
import { fetchArtistsRequest } from '../../../redux/features/artist/artistSlice';


const TopArtists = () => {
    const dispatch = useDispatch();

    const { artists, loading, error } = useSelector((state) => state.artist);

    useEffect(() => {
        dispatch(fetchArtistsRequest());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Popular <span className='text-pink-500'>Artists</span>
            </h1>
            <div className='grid md:grid-cols-7 grid-cols-2 md:gap-3 mt-7'>
                {artists.data && artists.data.map((artist) => (
                    <div key={artist._id} className='rounded-lg text-center'>
                        <img
                            src={artist.userId.avatar.url}
                            alt={artist.userId.name}
                            className='w-40 h-40 object-cover rounded-full'
                        />
                        <h2 className='text-white text-xl font-semibold mt-4'>{artist.userId.name}</h2>
                    </div>
                ))}
                <div className='col-span-1 flex justify-center items-center'>
                    <div className='text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-slate-800 cursor-pointer hover:bg-pink-600 transition-all'>
                        <IoAdd size={30} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopArtists;
