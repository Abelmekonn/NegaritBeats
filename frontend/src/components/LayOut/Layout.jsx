import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='pt-5  md:px-5 relative overflow-y-auto h-screen w-screen overflow-x-hidden '>
                <div className=''>
                    <Header />
                </div>
                <div className="content">
                    {children} {/* This will render the dynamic content */}
                </div>
                <Footer />
                <MusicPlayer />
            </div>
        </div>
    );
}

export default Layout;
