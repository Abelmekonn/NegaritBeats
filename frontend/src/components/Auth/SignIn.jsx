import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRequest } from '../../../redux/features/user/userSlice'; 
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Create navigate function
    const { loading, error } = useSelector((state) => state.user); // Get loading and error state from Redux

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(loginUserRequest({ email, password })); // Dispatch login action
            toast.success("success")
            navigate('/')
        } else {
            toast.error('Please enter both email and password');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-[#181818]">
            <form
                onSubmit={handleSubmit} // Form submission handler
                className="flex flex-col gap-4 max-w-md p-6 rounded-2xl bg-[#1a1a1a] w-[50%] text-white border border-gray-700"
            >
                <p className="text-2xl font-semibold text-[#00bfff] relative flex items-center pl-8">
                    Login
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#00bfff] rounded-full"></span>
                </p>
                <p className="text-sm text-gray-400 text-center">Welcome back to</p>
                <span className="text-3xl text-center font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    NegaritBeats
                </span>

                {/* Email input */}
                <label className="relative">
                    <input
                        className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Capture email input
                        placeholder=" "
                        required
                    />
                    <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">
                        Email
                    </span>
                </label>

                {/* Password input */}
                <label className="relative">
                    <input
                        className="bg-[#333] text-white w-full py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:border-[#00bfff] placeholder-transparent"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Capture password input
                        placeholder=" "
                        required
                    />
                    <span className="absolute left-3 top-1 text-gray-400 transition-all duration-200 transform origin-left scale-100 pointer-events-none">
                        Password
                    </span>
                </label>

                {/* Submit button */}
                <button
                    type="submit"
                    className="mt-4 py-2 rounded-md bg-[#00bfff] text-white font-semibold transition duration-200 hover:bg-[#00bfff96] disabled:opacity-50"
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>

                {/* Error message */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <p className="text-sm text-gray-400 text-center">
                    Don&apos;t have an account?{' '}
                    <a href="/register" className="text-[#00bfff] hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default SignIn;
