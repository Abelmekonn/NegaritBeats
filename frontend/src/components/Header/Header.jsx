import React, { useState, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Access user data and login state from Redux store
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  console.log(user)
  const userName = user ? user.name : ''; // Get username if user exists

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`py-4   mx-auto bg-zinc-400 rounded-lg bg-opacity-60 transition-all duration-300 ${isScrolled ? 'bg-opacity-70' : ''}`}>
      <div className='flex items-center gap-28 justify-between px-6 mx-auto'>
        {/* Search Input */}
        <div className='hidden md:block relative'>
          <IoIosSearch className='rotate-90 absolute bottom-[10px] left-2 text-gray-50' size={24} />
          <input
            type="text"
            className='py-2 pl-10 pr-4 w-80 rounded-lg bg-[#282727] text-gray-50 placeholder-gray-300 focus:outline-none'
            placeholder='Search for Music, Artists, ...'
          />
        </div>

        {/* Links */}
        <div className='flex gap-5'>
          <Link to='/about' className='text-white text-xl font-medium text-center'>
            About Us
          </Link>
          <Link to='/contact' className='text-white text-xl font-medium text-center'>
            Contact
          </Link>
          <Link to='/premium' className='text-white text-xl font-medium text-center'>
            Premium
          </Link>
        </div>

        {/* Log In & Sign Up Buttons - Conditionally Render */}
        {!isLoggedIn ? (
          <div className='flex gap-3'>
            <Link to='/login' className='flex flex-col justify-center'>
              <button className='px-4 py-2 border border-[#EE10B0] rounded-md'>
                <p className='text-[#EE10B0] font-medium text-center'>Log In</p>
              </button>
            </Link>

            <Link to='/register' className='flex flex-col justify-center'>
              <button className='px-4 py-2 rounded-md bg-[#EE10B0]'>
                <p className='text-white font-medium text-center'>Sign Up</p>
              </button>
            </Link>
          </div>
        ) : (
          <div className='flex gap-4 items-center'>
            <img src={user?.avatar?.url} alt="" className='w-12 h-12 rounded-full'/>
            <p className="text-white">Welcome, {userName}!</p> {/* Display the user's name */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
