import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import artist1 from '../../assets/artist/artist1.jpg';
import artist2 from '../../assets/artist/artist2.jpg';
import artist3 from '../../assets/artist/artist3.jpg';
import artist4 from '../../assets/artist/artist4.jpg';
import artist5 from '../../assets/artist/artist5.jpg';
import artist6 from '../../assets/artist/artist6.jpg';
import { IoAdd } from 'react-icons/io5';
import { fetchArtistsRequest } from '../../../redux/features/artist/artistSlice';


const TopArtists = () => {
    const dispatch = useDispatch();
    const { artists } = useSelector((state) => state.artist);

    console.log(artists)

    useEffect(() => {
        dispatch(fetchArtistsRequest());
    }, [dispatch]);


    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Popular <span className='text-pink-500'>Artists</span>
            </h1>
            <div className='grid md:grid-cols-7 grid-cols-2  md:gap-3 mt-7'>
                {artists.data.map((artist, index) => (
                    <div key={artist._id} className=' rounded-lg text-center'>
                        <img
                            src={artist.userId.avatar.url}
                            alt={artist.name}
                            className='w-40 h-40 object-cover rounded-full'
                        />
                        <h2 className='text-white text-xl font-semibold mt-4'>{artist.userId.name}</h2>
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
