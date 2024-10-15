import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className=' py-4 fixed z-50'>
      <div className='flex  items-center gap-14 px-6  mx-auto'>
        {/* Search Input */}
        <div className='relative'>
          <IoIosSearch className='rotate-90 absolute bottom-[10px] left-2 text-gray-50' size={24} />
          <input
            type="text"
            className='py-2 pl-10 pr-4 w-80 rounded-lg bg-[#666262] text-gray-50 placeholder-gray-300 focus:outline-none'
            placeholder='Search for Music, Artists, ...'
          />
        </div>

        {/* Links */}
        <Link to='/about' className='text-white text-xl font-medium text-center'>
          About Us
        </Link>
        <Link to='/contact' className='text-white text-xl font-medium text-center'>
          Contact
        </Link>
        <Link to='/premium' className='text-white text-xl font-medium text-center'>
          Premium
        </Link>

        {/* Log In Button */}
        <Link to='/login' className='flex flex-col justify-center'>
          <button className='px-12 py-2 border border-[#EE10B0] rounded-md'>
            <p className='text-[#EE10B0] font-medium text-center'>Log In</p>
          </button>
        </Link>

        {/* Sign Up Button */}
        <Link to='/register' className='flex flex-col justify-center'>
          <button className='px-12 py-2 rounded-md bg-[#EE10B0]'>
            <p className='text-white font-medium text-center'>Sign Up</p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header;
