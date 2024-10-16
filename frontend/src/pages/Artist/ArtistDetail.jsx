import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import artist1 from '../../assets/artist/artist1.jpg';
import artist2 from '../../assets/artist/artist2.jpg';
import artist3 from '../../assets/artist/artist3.jpg';
import artist4 from '../../assets/artist/artist4.jpg';
import artist5 from '../../assets/artist/artist5.jpg';
import artist6 from '../../assets/artist/artist6.jpg';
import SingleArtistMusics from '../../components/Artist/SingleArtistMusics';
import SingleArtistAlbum from '../../components/Artist/SingleArtistAlbum';
import { FaArrowLeft } from 'react-icons/fa';
import SingleSongs from '../../components/Artist/SinlgeSongs';
import ArtistPlaylist from '../../components/Artist/ArtistPlaylist';
import ArtistToFollow from '../../components/Artist/ArtistTofollow';

const artists = [
    { id: 1, avatar: artist1, name: 'Artist One', followers: '1.2M', totalLikes: '350K', albums: 5 },
    { id: 2, avatar: artist2, name: 'Artist Two', followers: '900K', totalLikes: '200K', albums: 3 },
    { id: 3, avatar: artist3, name: 'Artist Three', followers: '800K', totalLikes: '150K', albums: 2 },
    { id: 4, avatar: artist4, name: 'Artist Four', followers: '1.5M', totalLikes: '400K', albums: 4 },
    { id: 5, avatar: artist5, name: 'Artist Five', followers: '600K', totalLikes: '120K', albums: 6 },
    { id: 6, avatar: artist6, name: 'Artist Six', followers: '300K', totalLikes: '80K', albums: 1 },
];

const ArtistDetail = () => {
    const { id } = useParams(); // Get the id from the URL
    const navigate = useNavigate(); // Create a navigate function

    // Find the artist by id
    const artist = artists.find(a => a.id === parseInt(id));

    if (!artist) {
        return (
            <div className="text-white text-center pt-20">
                <p>Artist not found</p>
                <Link to="/artists">
                    <button className="mt-4 px-4 py-2 bg-[#4c3cff] text-white rounded-md">
                        Go back to Artists
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col pt-20 gap-12">
            <div
                className="p-6 min-h-[60vh] flex justify-between rounded-2xl bg-cover bg-center px-6 relative"
                style={{ backgroundImage: `url(${artist.avatar})` }}
            >
                <div className="absolute inset-0 bg-black opacity-40 rounded-2xl" />
                <div className='z-10 relative text-white'>
                    {/* Add onClick to go back when the arrow is clicked */}
                    <FaArrowLeft size={30} className="cursor-pointer" onClick={() => navigate(-1)} />
                </div>
                <div className="relative h-full w-full justify-between flex self-end items-center z-10">
                    <h1 className="text-3xl font-bold text-white">{artist.name}</h1>
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

            <SingleArtistMusics />
            <SingleArtistAlbum />
            <SingleSongs />
            <ArtistPlaylist />
            <ArtistToFollow />
        </div>
    );
};

export default ArtistDetail;
