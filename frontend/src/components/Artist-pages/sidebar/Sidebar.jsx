import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserRequest } from '../../../../redux/features/user/userSlice';
import { toast } from 'react-toastify';
import { MdPerson, MdLibraryMusic, MdAlbum, MdOutlineDashboard } from 'react-icons/md';
import { IoIosLogOut, IoIosCreate, IoMdClose, IoIosAlbums } from 'react-icons/io';
import LogoutModal from '../../Common/Logout';
import { Link } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUserRequest()); // Dispatch logout action
        setIsLogoutModalOpen(false); // Close the modal
        toast.success('Logout successful!'); // Show success message
        window.location.reload(); // Reload the page to reflect logout
    };

    const artistItems = [
        { icon: <MdOutlineDashboard size={24} />, label: 'Dashboard', to: '/artist' },
        { icon: <MdPerson size={24} />, label: 'Profile', to: '/artist/profile' },
        { icon: <IoIosCreate size={24} />, label: 'Create Song', to: '/artist/create-song' },
        { icon: <MdAlbum size={24} />, label: 'Create Album', to: '/artist/create-album' },
        { icon: <MdLibraryMusic size={24} />, label: 'My Songs', to: '/artist/my-songs' },
        { icon: <IoIosAlbums size={24} />, label: 'My Albums', to: '/artist/my-albums' },
        { icon: <IoIosLogOut size={24} />, label: 'Logout', onClick: () => setIsLogoutModalOpen(true) }
    ];

    return (
        <>
            {/* Toggle Button - Always Visible */}
            <div className={`absolute ${isOpen ? "left-52 top-4" : "w-20 bg-gray-900 flex justify-center top-0 left-0 py-2"} z-50`}>
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
                    {/* Artist Section */}
                    <div className='flex flex-col gap-7 mb-2'>
                        <p className={`text-[#991272] px-3 ${!isOpen && 'hidden'}`}>Artist Page</p>
                        <div className='px-4 flex flex-col gap-6'>
                            {artistItems.map((item, index) => (
                                <Link key={index} to={item.to} className='flex items-center gap-3 hover:bg-pink-500 rounded-lg hover:scale-105 cursor-pointer py-2 px-3' onClick={item.onClick}>
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
