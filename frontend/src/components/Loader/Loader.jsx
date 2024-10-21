import React from 'react'
import './loader.css'
const Loader = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center bg-[#181818]'>
            <div className="loader">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </div>
    )
}

export default Loader