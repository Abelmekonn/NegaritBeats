import React, { useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { updateProfileRequest } from '../../../redux/features/user/userSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarBase64, setAvatarBase64] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [email, setEmail] = useState('');
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        if (user) {
            setUsername(user.name || '');
            setEmail(user.email || '');
        }
    }, [user]);

    // Handle image change and convert to base64
    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarBase64(reader.result); // Set base64 image string
                setAvatarPreview(reader.result); // Update preview
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const data = {
            name,
            password: password || "", // Only include password if it exists
            avatar: avatarBase64 || "", // Only include avatar if it exists
        };

        console.log("data", data);
        dispatch(updateProfileRequest(data)); // Dispatch the JSON payload
    };

    return (
        <div className="w-[60%] mx-auto bg-gray-800 p-6 rounded-lg">
            <h1 className='text-white text-3xl font-bold mb-6'>
                Profile <span className='text-pink-500'>Update</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Image Section */}
                <div className="relative w-[120px] h-[120px] mx-auto mb-6">
                    <img
                        src={avatarPreview || user?.avatar?.url}
                        alt="User Avatar"
                        className="w-[150px] h-[120px] cursor-pointer border-[3px] border-pink-600 rounded-full"
                        width={120}
                        height={120}
                    />
                    <input
                        type="file"
                        className="hidden"
                        id="avatar"
                        onChange={imageHandler}
                        accept="image/png,image/jpg,image/jpeg,image/webp"
                    />
                    <label htmlFor="avatar">
                        <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                            <AiOutlineCamera size={20} className="z-1 text-white" />
                        </div>
                    </label>
                </div>

                {/* Email (Read-only) */}
                <div>
                    <label className="text-white font-semibold block mb-2">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed focus:outline-none"
                        value={email}
                        readOnly
                    />
                </div>

                {/* Username */}
                <div>
                    <label className="text-white font-semibold block mb-2">Username</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter new username"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="text-white font-semibold block mb-2">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-white font-semibold block mb-2">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-pink-500 p-3 rounded-lg text-white font-bold transition ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
                    }`}
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
