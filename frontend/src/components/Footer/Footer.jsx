import React from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-gray-900 py-8 mt-12'>
            <div className='flex flex-col md:flex-row justify-around text-white mx-4'>
                <div className='mb-6 md:mb-0 w-1/3'>
                    <h2 className='text-lg font-semibold'>About</h2>
                    <p className='text-sm'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eos unde voluptates odit minima, blanditiis nemo, et doloribus non sed labore rem maiores autem necessitatibus alias ab ut, cumque magnam.
                    </p>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h2 className='text-lg font-semibold '>Melodies</h2>
                    <ul className=' list-inside text-sm'>
                        <li>Songs</li>
                        <li>Radio</li>
                        <li>Podcast</li>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h2 className='text-lg font-semibold'>Access</h2>
                    <ul className='list-inside text-sm'>
                        <li>Explore</li>
                        <li>Artist</li>
                        <li>Playlist</li>
                        <li>Albums</li>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h2 className='text-lg font-semibold'>Contact</h2>
                    <ul className=' list-inside text-sm'>
                        <li>About</li>
                        <li>Policy</li>
                        <li>Social Media</li>
                        <li>Support</li>
                    </ul>
                </div>
                <div className='text-center'>
                    <div className='py-2 text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-5'>
                        NegaritBeats
                    </div>
                    <div className='flex justify-center space-x-4 text-2xl'>
                        <FaInstagram className='hover:text-pink-500' />
                        <FaFacebook className='hover:text-blue-600' />
                        <FaTwitter className='hover:text-blue-400' />
                        <FaPhone className='hover:text-green-500' />
                    </div>
                </div>
            </div>
            <div className='text-center text-sm text-gray-400 mt-4'>
                © {new Date().getFullYear()} NegaritBeats. All rights reserved.
            </div>
        </div>
    );
};

export default Footer;
