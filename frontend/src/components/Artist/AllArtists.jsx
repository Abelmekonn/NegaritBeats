import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import artist1 from '../../assets/artist/artist1.jpg';
import artist2 from '../../assets/artist/artist2.jpg';
import artist3 from '../../assets/artist/artist3.jpg';
import artist4 from '../../assets/artist/artist4.jpg';
import artist5 from '../../assets/artist/artist5.jpg';
import artist6 from '../../assets/artist/artist6.jpg';
import { IoAdd } from 'react-icons/io5';

const artists = [
    { id: 1, avatar: artist1, name: 'Artist One', followers: '1.2M', totalLikes: '350K', albums: 5,MonthlyListen :"12,93445" },
    { id: 2, avatar: artist2, name: 'Artist Two', followers: '900K', totalLikes: '200K', albums: 3 ,MonthlyListen :"12,93445"},
    { id: 3, avatar: artist3, name: 'Artist Three', followers: '800K', totalLikes: '150K', albums: 2 ,MonthlyListen :"12,93445"},
    { id: 4, avatar: artist4, name: 'Artist Four', followers: '1.5M', totalLikes: '400K', albums: 4 ,MonthlyListen :"12,93445"},
    { id: 5, avatar: artist5, name: 'Artist Five', followers: '600K', totalLikes: '120K', albums: 6 ,MonthlyListen :"12,93445"},
    { id: 6, avatar: artist6, name: 'Artist Six', followers: '300K', totalLikes: '80K', albums: 1 ,MonthlyListen :"12,93445"},
];

const AllArtists = () => {
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
                        <p className="text-gray-300">Monthly listen</p>
                        <p className="text-gray-300">Likes</p>
                    </div>
                </div>
                {artists.map((artist, index) => (
                    <div key={artist.id} className={`flex items-center p-4 rounded-lg bg-gray-800`}>
                        <span className="text-white mr-4">#{artist.id}</span>
                        <Link to={`/artist/${artist.id}`}>
                            <img src={artist.avatar} alt={artist.name} className="w-20 h-20 rounded-lg mr-4 cursor-pointer" />
                        </Link>
                        <div className="flex w-full justify-between">
                            <h2 className="text-white">{artist.name}</h2>
                            <p className="text-gray-300">{artist.albums}</p>
                            <p className="text-gray-300">{artist.followers}</p>
                            <p className="text-gray-300">{artist.MonthlyListen}</p>
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
