import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube, FaUserFriends } from "react-icons/fa";
import { FaCompactDisc, FaFacebook, FaMusic } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';

const ArtistHeader = ({ artist }) => {
    return (
        <div className="artist-header flex items-center justify-between p-4 bg-[#111827] shadow-lg rounded-xl">
            {/* Profile Image */}
            <div className='flex items-center gap-6'>
                <div className="w-80 h-80 rounded-xl overflow-hidden shadow-lg">
                    <img src={artist?.avatar?.url} alt="Artist Profile" className="w-full h-full object-cover" />
                </div>

                {/* Artist Details */}
                <div className='flex flex-col gap-4'>
                    <h2 className="text-3xl text-white font-bold">{artist.name}</h2>
                    <p className="text-gray-50">{artist.bio}</p>

                    {/* Stats */}
                    <div className="flex items-center gap-7 mt-4">
                        <div className='bg-[#23355d] w-24 h-24 p-3 flex flex-col items-center justify-center rounded-lg shadow-slate-900 shadow-lg'>
                            <FaUserFriends className="text-white text-2xl mb-1" />
                            <span className="text-lg text-white font-semibold">1.5M</span>
                            <p className="text-sm text-gray-50">Followers</p>
                        </div>
                        <div className='bg-[#23355d] w-24 h-24 p-3 flex flex-col items-center justify-center rounded-lg shadow-slate-900 shadow-lg'>
                            <FaMusic className="text-white text-2xl mb-1" />
                            <span className="text-lg text-white font-semibold">45</span>
                            <p className="text-sm text-gray-50">Songs</p>
                        </div>
                        <div className='bg-[#23355d] w-24 h-24 p-3 flex flex-col items-center justify-center rounded-lg shadow-slate-900 shadow-lg'>
                            <FaCompactDisc className="text-white text-2xl mb-1" />
                            <span className="text-lg text-white font-semibold">10</span>
                            <p className="text-sm text-gray-50">Albums</p>
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex items-center gap-4 mt-4">
                        <a href={artist.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600">
                            <FaInstagram size={30} />
                        </a>
                        <a href={artist.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                            <FaTwitter size={30} />
                        </a>
                        <a href={artist.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                            <FaFacebook size={30} />
                        </a>
                        <a href={artist.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-600">
                            <FaYoutube size={30} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Edit Profile Button */}
            <button className='text-white self-start mr-3 mb-3 hover:text-pink-700 transition-all text-lg py-3 px-4 rounded-lg '>
                <IoMdSettings size={30} />
            </button>
        </div>
    );
};

export default ArtistHeader;
