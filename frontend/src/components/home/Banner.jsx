import React from 'react';
import { Link } from 'react-router-dom';

const Banner = ({ backgroundImage, heading, highlightedText, subtext, primaryButton, secondaryButton }) => {
    return (
        <div
            className='h-dvh md:min-h-[90vh] rounded-2xl bg-cover bg-center md:px-6 relative'
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className='absolute inset-0 bg-black opacity-40 rounded-2xl' />
            <div className='xl:w-1/2 absolute top-1/3 gap-6 flex flex-col'>
                <h1 className='text-white text-6xl font-bold'>
                    {heading} <span className='text-pink-500'>{highlightedText}</span> <br />
                    in One place
                </h1>
                <p className='text-gray-300 text-lg font-semibold'>{subtext}</p>
                <div className='flex justify-between lg:w-3/4'>
                    <Link to={primaryButton.link} className='flex flex-col justify-center'>
                        <button className='md:px-12 px-4 py-2 rounded-md bg-[#EE10B0]'>
                            <p className='text-white font-medium text-center'>{primaryButton.text}</p>
                        </button>
                    </Link>
                    <Link to={secondaryButton.link} className='flex flex-col justify-center'>
                        <button className='md:px-12 px-4 text-[#4c3cff] py-2 border hover:text-white border-[#4c3cff] hover:bg-[#4c3cff] rounded-md transition-all'>
                            <p className='font-medium text-center'>{secondaryButton.text}</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;
