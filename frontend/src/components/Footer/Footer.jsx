import React from 'react';
import { FaFacebook, FaInstagram, FaPhone, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-gray-900 py-8 mt-12'>
            <div className='flex flex-col md:flex-row justify-around text-white mx-4'>
                <div className='mb-6 md:mb-0 w-1/3'>
                    <h2 className='text-4xl mb-6 font-semibold'>About</h2>
                    <p className='text-sm text-gray-300'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eos unde voluptates odit minima, blanditiis nemo, et doloribus non sed labore rem maiores autem necessitatibus alias ab ut, cumque magnam.
                    </p>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h2 className='text-4xl font-semibold mb-6'>Melodies</h2>
                    <ul className='list-inside text-lg text-gray-300'>
                        <li><a href='#' className='hover:text-white'>Songs</a></li>
                        <li><a href='#' className='hover:text-white'>Radio</a></li>
                        <li><a href='#' className='hover:text-white'>Podcast</a></li>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h2 className='text-4xl font-semibold mb-6'>Access</h2>
                    <ul className='list-inside text-lg text-gray-300'>
                        <li><a href='#' className='hover:text-white'>Explore</a></li>
                        <li><a href='#' className='hover:text-white'>Artist</a></li>
                        <li><a href='#' className='hover:text-white'>Playlist</a></li>
                        <li><a href='#' className='hover:text-white'>Albums</a></li>
                    </ul>
                </div>
                <div className='mb-6 md:mb-0'>
                    <h2 className='text-4xl font-semibold mb-6'>Contact</h2>
                    <ul className='list-inside text-lg text-gray-300'>
                        <li><a href='#' className='hover:text-white'>About</a></li>
                        <li><a href='#' className='hover:text-white'>Policy</a></li>
                        <li><a href='#' className='hover:text-white'>Social Media</a></li>
                        <li><a href='#' className='hover:text-white'>Support</a></li>
                    </ul>
                </div>
                <div className='text-center flex flex-col justify-center'>
                    <div className='py-2 text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-5'>
                        NegaritBeats
                    </div>
                    <div className='flex justify-center space-x-4 text-2xl'>
                        <a href='#'><FaInstagram className='hover:text-pink-500' /></a>
                        <a href='#'><FaFacebook className='hover:text-blue-600' /></a>
                        <a href='#'><FaTwitter className='hover:text-blue-400' /></a>
                        <a href='#'><FaPhone className='hover:text-green-500' /></a>
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
