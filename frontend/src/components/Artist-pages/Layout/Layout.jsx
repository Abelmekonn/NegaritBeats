/* eslint-disable react/prop-types */
import React from 'react'
import Sidebar from '../sidebar/Sidebar';
import MusicPlayer from '../../MusicPlayer/MusicPlayer';

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='pt-5 px-5 relative overflow-y-auto h-screen w-screen overflow-x-hidden '>
                <div className="content">
                    {children} {/* This will render the dynamic content */}
                </div>
                <MusicPlayer />
            </div>
        </div>
    );
}

export default Layout