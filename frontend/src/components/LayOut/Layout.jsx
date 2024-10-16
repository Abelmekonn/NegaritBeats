import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MusicPlayer from '../MusicPlayer/MusicPlayer';

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='pt-5 px-5 w-full  relative overflow-y-auto h-screen'>
                <Header />
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
