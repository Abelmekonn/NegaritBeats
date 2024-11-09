import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SingleArtistMusics from '../../components/Artist/SingleArtistMusics';
import SingleArtistAlbum from '../../components/Artist/SingleArtistAlbum';
import { FaArrowLeft, FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaUserFriends, FaCompactDisc, FaMusic } from 'react-icons/fa';
import SingleSongs from '../../components/Artist/SinlgeSongs';
import ArtistPlaylist from '../../components/Artist/ArtistPlaylist';
import ArtistToFollow from '../../components/Artist/ArtistTofollow';
import Layout from '../../components/LayOut/Layout';
import { fetchArtistByIdRequest } from '../../../redux/features/artist/artistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FcApproval } from 'react-icons/fc';

const ArtistDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentArtist: artist, loading, error } = useSelector((state) => state.artist);

    useEffect(() => {
        dispatch(fetchArtistByIdRequest(id));
    }, [dispatch, id]);

    console.log(artist)

    if (loading) {
        return <div className="text-white text-center pt-20">Loading artist data...</div>;
    }

    if (error) {
        return (
            <div className="text-white text-center pt-20">
                <p>Failed to load artist details: {error}</p>
                <Link to="/artists">
                    <button className="mt-4 px-4 py-2 bg-[#4c3cff] text-white rounded-md">
                        Go back to Artists
                    </button>
                </Link>
            </div>
        );
    }

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
        <Layout>
            <div className="flex flex-col mt-16 gap-12">
                <div className="artist-header flex items-center justify-between p-4 bg-[#111827] shadow-lg rounded-xl">
                    {/* Profile Image */}
                    <div >
                        <div className="z-10 relative text-white">
                            <FaArrowLeft size={30} className="cursor-pointer" onClick={() => navigate(-1)} />
                        </div>
                        <div className='flex items-center justify-between gap-6 w-full'>
                            <div className="w-40 h-40 object-cover rounded-xl overflow-hidden shadow-lg">
                                <img src={artist.artist.userId?.avatar?.url} alt="Artist Profile" className="w-full h-full object-fill" loading="lazy" />
                            </div>
                            {/* Artist Details */}
                            <div className='flex flex-col gap-4'>
                                <h2 className="text-3xl text-white font-bold">{artist.artist.userId.name}</h2>
                                <p className="text-gray-50">{artist.artist.bio}</p>
                                <div className="mt-1 flex gap-2 text-gray-50">
                                    {artist.artist.genres && artist.artist.genres.length > 0 ? (
                                        artist.artist.genres.map((genre, index) => (
                                            <p key={index}>{genre}</p>
                                        ))
                                    ) : (
                                        <p>No genres available</p>
                                    )}

                                </div>
                                {/* Stats */}
                                <div className="flex items-center gap-7 mt-4">
                                    <div className='bg-[#23355d] w-24 h-24 p-3 flex flex-col items-center justify-center rounded-lg shadow-slate-900 shadow-lg'>
                                        <FaUserFriends className="text-white text-2xl mb-1" />
                                        <span className="text-lg text-white font-semibold">{artist.artist.followers.length}</span>
                                        <p className="text-sm text-gray-50">Followers</p>
                                    </div>
                                    <div className='bg-[#23355d] w-24 h-24 p-3 flex flex-col items-center justify-center rounded-lg shadow-slate-900 shadow-lg'>
                                        <FaMusic className="text-white text-2xl mb-1" />
                                        <span className="text-lg text-white font-semibold">{artist.artist.singleSongs.length}</span>
                                        <p className="text-sm text-gray-50">Songs</p>
                                    </div>
                                    <div className='bg-[#23355d] w-24 h-24 p-3 flex flex-col items-center justify-center rounded-lg shadow-slate-900 shadow-lg'>
                                        <FaCompactDisc className="text-white text-2xl mb-1" />
                                        <span className="text-lg text-white font-semibold">{artist.artist.albums.length}</span>
                                        <p className="text-sm text-gray-50">Albums</p>
                                    </div>
                                </div>

                                {/* Social Media Links */}
                                <div className="flex items-center gap-4 mt-4">
                                    {artist.artist.socialLinks?.instagram && (
                                        <a href={artist.artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                                            <FaInstagram size={30} />
                                        </a>
                                    )}
                                    {artist.artist.socialLinks?.twitter && (
                                        <a href={artist.artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                            <FaTwitter size={30} />
                                        </a>
                                    )}
                                    {artist.artist.socialLinks?.facebook && (
                                        <a href={artist.artist.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                                            <FaFacebook size={30} />
                                        </a>
                                    )}
                                    {artist.artist.socialLinks?.youtube && (
                                        <a href={artist.artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                                            <FaYoutube size={30} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between self-end gap-6">
                        <button className="px-12 py-2 rounded-md bg-[#EE10B0] text-white font-medium">
                            Follow
                        </button>
                        <button className="px-12 py-2 text-[#4c3cff] border border-[#4c3cff] hover:bg-[#4c3cff] hover:text-white rounded-md transition-all">
                            Unfollow
                        </button>
                    </div>
                </div>
                <SingleArtistMusics id={id}/>
                <SingleArtistAlbum id={id}/>
                <SingleSongs id={id} />
                <ArtistPlaylist id={id}/>
                <ArtistToFollow />
            </div>
        </Layout>
    );
};

export default ArtistDetail;
