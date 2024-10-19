import React, { useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai'; // Ensure you have react-icons installed

const UserProfile = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState('user@example.com');
    const avatarDefault = '/path/to/default-avatar.jpg'; // Placeholder for the default avatar image

    // Handle image change
    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            // Optionally, show preview
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar({ url: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (avatar) formData.append('avatar', avatar);

        fetch('/api/update-profile', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`, // Include user's token if needed
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Profile updated successfully', data);
                // Handle success
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                // Handle error
            });
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
                        src={avatar?.url ? avatar.url : avatarDefault}
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
                        value={username}
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
                    className="w-full bg-pink-500 p-3 rounded-lg text-white font-bold hover:bg-pink-600 transition">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
