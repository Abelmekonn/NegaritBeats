import React from 'react';

const SignIn = ({ onToggle }) => {
    return (
        <div className='h-screen flex items-center justify-center bg-[#181818]'>
            <form className="flex flex-col gap-4 max-w-md p-6 rounded-2xl bg-[#1a1a1a] w-[50%] text-white border border-gray-700">
                <p className="text-2xl font-semibold text-[#00bfff] relative flex items-center pl-8">
                    Login
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#00bfff] rounded-full"></span>
                </p>
                <p className="text-sm text-gray-400 text-center">Welcome back to
                </p>
                <span className='text-3xl text-center font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent'>NegaritBeats</span>


                <label className="relative">
                    <input
                        className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                        type="email"
                        placeholder=" "
                        required
                    />
                    <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Email</span>
                </label>

                <label className="relative">
                    <input
                        className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                        type="password"
                        placeholder=" "
                        required
                    />
                    <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">Password</span>
                </label>

                <button
                    type="submit"
                    className="mt-4 py-2 rounded-md bg-[#00bfff] text-white font-semibold transition duration-200 hover:bg-[#00bfff96]"
                >
                    Submit
                </button>

                <p className="text-sm text-gray-400 text-center">
                    Don&apos;t have an account? <a href="/register" className="text-[#00bfff] hover:underline">Register</a>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
