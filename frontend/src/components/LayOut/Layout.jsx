import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

const Layout = ({ children }) => {
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <div className='p-5 w-full relative overflow-y-auto h-screen'>
                <Header />
                <div className="content">
                    {children} {/* This will render the dynamic content */}
                </div>
            </div>
        </div>
    );
}

export default Layout;
