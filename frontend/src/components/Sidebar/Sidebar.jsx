import React, { useState } from 'react';
import { HiOutlineHome } from 'react-icons/hi';
import { IoCompassOutline } from 'react-icons/io5';
import { IoDiscOutline } from 'react-icons/io5';
import { CiUser } from 'react-icons/ci';
import { MdReplay } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { GrFavorite } from "react-icons/gr";
import { RiPlayListLine } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUserRequest } from '../../../redux/features/user/userSlice';
import { toast } from 'react-toastify';
import LogoutModal from '../Common/Logout';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUserRequest());
        setIsLogoutModalOpen(false);
        toast.success('Logout successful!');
        window.location.reload();
    };

    const menuItems = [
        { icon: <HiOutlineHome size={30} />, label: 'Home', to: '/' },
        { icon: <IoCompassOutline size={30} />, label: 'Discover', to: '/discover' },
        { icon: <IoDiscOutline size={30} />, label: 'Album', to: '/albums' },
        { icon: <CiUser size={30} />, label: 'Artists', to: '/artists' }
    ];

    const libraryItems = [
        { icon: <MdReplay size={30} />, label: 'Recently Added', to: '/recently-added' },
        { icon: <IoMdTime size={30} />, label: 'Most Played', to: '/most-played' }
    ];

    const playlistItems = [
        { icon: <GrFavorite size={30} />, label: 'Your Favorites', to: '/favorites' },
        { icon: <RiPlayListLine size={30} />, label: 'Your Playlist', to: '/playlist' },
        { icon: <MdLibraryAdd size={30} />, label: 'Add Playlist', to: '/add-playlist' }
    ];

    const generalItems = [
        { icon: <IoSettingsOutline size={30} />, label: 'Settings', to: '/settings' },
        { icon: <RiCalendarScheduleLine size={30} />, label: 'Subscription', to: '/subscription' },
        { icon: <IoIosLogOut size={30} />, label: 'Logout', onClick: () => setIsLogoutModalOpen(true) }
    ];

    return (
        <>
            {/* Toggle Button - Always Visible */}
            <div className={`absolute    ${isOpen ? "left-52 top-4" : "w-20 bg-gray-900 flex justify-center top-0 left-0 py-2"} z-50`}>
                <button onClick={toggleSidebar}>
                    {isOpen ? <IoMdClose size={30} className="text-white" /> : <HiOutlineMenuAlt3 size={30} className="text-white" />}
                </button>
            </div>

            {/* Sidebar */}
            <div className={`relative sidebar-scrollbar inset-y-0 left-0 transform ${isOpen ? "translate-x-0 w-80" : "w-30 pt-14"} transition-all duration-300 ease-in-out bg-gray-900 text-white py-8 overflow-y-auto z-40`}>
                <div className={`py-2 text-3xl text-center font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-5 ${!isOpen && "hidden"}`}>
                    NegaritBeats
                </div>

                {/* Menu Section */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-7 mb-2'>
                        <p className={`text-[#991272] px-3 ${!isOpen && 'hidden'}`}>Menu</p>
                        <div className='px-4 flex flex-col gap-6'>
                            {menuItems.map((item, index) => (
                                <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-2'>
                                    {item.icon}
                                    <span className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Library Section */}
                    <div className='flex flex-col gap-7 mb-2'>
                        <p className={`text-[#991272] px-3 ${!isOpen && 'hidden'}`}>Library</p>
                        <div className='px-4 flex flex-col gap-6'>
                            {libraryItems.map((item, index) => (
                                <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                    {item.icon}
                                    <span className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>{item.label}</span>

                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Playlist and Favorite Section */}
                    <div className='flex flex-col gap-7 mb-2'>
                        <p className={`text-[#991272] px-3 ${!isOpen && 'hidden'}`}>Playlist and Favorite</p>
                        <div className='px-4 flex flex-col gap-6'>
                            {playlistItems.map((item, index) => (
                                <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                    {item.icon}
                                    <span className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>{item.label}</span>

                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* General Section */}
                    <div className='flex flex-col gap-7'>
                        <p className={`text-[#991272] px-3 ${!isOpen && 'hidden'}`}>General</p>
                        <div className='px-4 flex flex-col gap-6'>
                            {generalItems.map((item, index) => (
                                <Link key={index} to={item.to || '#'} onClick={item.onClick} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3'>
                                    {item.icon}
                                    <span className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>{item.label}</span>

                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onLogout={handleLogout}
            />
        </>
    );
};

export default Sidebar;
