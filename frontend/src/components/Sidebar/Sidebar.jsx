import React from 'react'
import { RiHome5Line } from "react-icons/ri";
import { FaRegCompass } from "react-icons/fa6";
import { LuDisc2 } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { RiPlayListLine } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const menuItems = [
        { icon: <RiHome5Line size={20} />, label: 'Home', to: '/' },
        { icon: <FaRegCompass size={20} />, label: 'Discover', to: '/discover' },
        { icon: <LuDisc2 size={20} />, label: 'Album', to: '/album' },
        { icon: <FaRegUserCircle size={20} />, label: 'Artists', to: '/artists' }
    ];

    const libraryItems = [
        { icon: <MdReplay />, label: 'Recently Added', to: '/recently-added' },
        { icon: <IoMdTime />, label: 'Most Played', to: '/most-played' }
    ];

    const playlistItems = [
        { icon: <GrFavorite />, label: 'Your Favorites', to: '/favorites' },
        { icon: <RiPlayListLine />, label: 'Your Playlist', to: '/playlist' },
        { icon: <MdLibraryAdd />, label: 'Add Playlist', to: '/add-playlist' }
    ];

    const generalItems = [
        { icon: <IoSettingsOutline />, label: 'Settings', to: '/settings' },
        { icon: <IoIosLogOut />, label: 'Logout', to: '/logout' }
    ];

    return (
        <div className='relative  text-white h-screen  py-8 pl-6 w-96 overflow-y-auto sidebar-scrollbar'>
            <div className='py-2 text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-5'>
                NegaritBeats
            </div>

            {/* Menu Section */}
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-7 mb-2'>
                    <p className='text-[#991272]'>Menu</p>
                    <div className='px-4 flex flex-col gap-6'>
                        {menuItems.map((item, index) => (
                            <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                {item.icon}
                                <span className='text-2xl font-semibold'>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Library Section */}
                <div className='flex flex-col gap-7 mb-2'>
                    <p className='text-[#991272]'>Library</p>
                    <div className='px-4 flex flex-col gap-6'>
                        {libraryItems.map((item, index) => (
                            <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                {item.icon}
                                <span className='text-2xl font-semibold'>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Playlist and Favorite Section */}
                <div className='flex flex-col gap-7 mb-2'>
                    <p className='text-[#991272]'>Playlist and Favorite</p>
                    <div className='px-4 flex flex-col gap-6'>
                        {playlistItems.map((item, index) => (
                            <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                {item.icon}
                                <span className='text-2xl font-semibold'>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* General Section */}
                <div className='flex flex-col gap-7'>
                    <p className='text-[#991272]'>General</p>
                    <div className='px-4 flex flex-col gap-6'>
                        {generalItems.map((item, index) => (
                            <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                {item.icon}
                                <span className='text-2xl font-semibold'>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
