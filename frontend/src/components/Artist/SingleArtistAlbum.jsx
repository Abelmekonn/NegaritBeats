import React, { useEffect } from 'react'
import { IoAdd } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumsStart } from "../../../redux/features/album/albumSlice";
// Function to truncate title to 40 characters
const truncateTitle = (title, maxLength = 40) => {
    return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
};



const SingleArtistAlbum = ({id}) => {
    const dispatch = useDispatch();
    const { albums, loading, error } = useSelector((state) => state.album);

    useEffect(() => {
        dispatch(fetchAlbumsStart());
    }, [dispatch]);

    console.log(albums);
    const filteredSongs = Array.isArray(albums.albums)
    ? albums.albums.reduce((acc, album) => {
        if (album.artist._id === id) {
            acc.push(album);
        }
        return acc;
    }, [])
    : [];


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className='w-full'>
            <h1 className='text-white text-3xl font-bold'>
                Artist <span className='text-pink-500'>Albums</span>
            </h1>
            <div className='flex'>
                <div className='grid grid-cols-4 gap-4 mt-7'>
                    {filteredSongs.map((album, index) => (
                        <div key={index} className='bg-[#333] p-2 rounded-lg'>
                            <img src={album.coverImageUrl} alt={album.title} className='w-full h-40 object-cover rounded-lg' />
                            <h2 className='text-white text-xl font-semibold mt-4'>{truncateTitle(album.title, 15)}</h2>
                            <p className='text-gray-400'>{album.artist?.user?.name }</p>
                        </div>
                    ))}
                    
                </div>
                {/* Add New Button */}
                <div className='col-span-1 flex justify-center items-center'>
                        <div className=' text-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-slate-800 shadow-slate-800 cursor-pointer hover:bg-pink-600 transition-all'>
                            <IoAdd size={30} />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default SingleArtistAlbum