import React, { useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { updateProfileRequest } from '../../../../redux/features/user/userSlice';
import { MdClose } from 'react-icons/md';

const Profile = () => {
    const dispatch = useDispatch();
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarBase64, setAvatarBase64] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: ''
    });
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        if (user) {
            setUsername(user.name || '');
            setEmail(user.email || '');
            setBio(user.bio || '');
            setGenres(user.genres || []);
            setSocialLinks({
                facebook: user.socialLinks?.facebook || '',
                instagram: user.socialLinks?.instagram || '',
                twitter: user.socialLinks?.twitter || '',
                youtube: user.socialLinks?.youtube || ''
            });
        }
    }, [user]);

    const imageHandler = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size <= 5000000) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarBase64(reader.result);
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('File must be a JPG or PNG image and less than 5MB');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        const data = {
            name,
            password: password || "",
            avatar: avatarBase64 || "",
            bio,
            genres,
            socialLinks
        };

        console.log("data", data);
        dispatch(updateProfileRequest(data));
    };

    const handleSocialLinkChange = (platform, value) => {
        if (value.startsWith('http')) {
            setSocialLinks((prevLinks) => ({
                ...prevLinks,
                [platform]: value,
            }));
        } else {
            toast.error('Social link must start with "http"');
        }
    };

    const handleAddGenre = () => {
        if (newGenre && !genres.includes(newGenre)) {
            setGenres([...genres, newGenre]);
            setNewGenre('');
        }
    };

    const handleRemoveGenre = (genreToRemove) => {
        setGenres(genres.filter((genre) => genre !== genreToRemove));
    };

    const handleReset = () => {
        setUsername(user?.name || '');
        setPassword('');
        setConfirmPassword('');
        setAvatarBase64('');
        setAvatarPreview(user?.avatar?.url || '');
        setEmail(user?.email || '');
        setBio(user?.bio || '');
        setGenres(user?.genres || []);
        setSocialLinks({
            facebook: user?.socialLinks?.facebook || '',
            instagram: user?.socialLinks?.instagram || '',
            twitter: user?.socialLinks?.twitter || '',
            youtube: user?.socialLinks?.youtube || ''
        });
    };

    return (
        <div className=" mx-auto  p-6 rounded-lg">
            <h1 className='text-white text-3xl font-bold mb-6'>
                Profile <span className='text-pink-500'>Update</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 ">
                <div className="relative w-[200px] h-[200px] mx-auto mb-6">
                    <img
                        src={avatarPreview || user?.avatar?.url}
                        alt="User Avatar"
                        className="w-full h-full  cursor-pointer border-[3px] border-pink-600 rounded-full"
                        onError={() => setAvatarPreview('path_to_default_image')}
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

                <div className='flex flex-col md:flex-row w-full justify-around gap-10 ' >
                    <div className='w-full space-y-5 bg-gray-800 p-6 rounded-lg'>
                        <div>
                            <label className="text-white font-semibold block mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed focus:outline-none"
                                value={email}
                                readOnly
                            />
                        </div>

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
                    </div>
                    <div className='w-full space-y-5 bg-gray-800 p-6 rounded-lg'>
                        <label className="text-white font-semibold block mb-2">Bio</label>
                        <textarea
                            className="w-full p-2 h-40 rounded-lg bg-gray-700 text-white focus:outline-none"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself"
                        />
                    </div>
                </div>


                <div className=' flex flex-col md:flex-row w-full justify-around gap-10'>
                    <div className='w-full space-y-5 bg-gray-800 p-6 rounded-lg'>
                        <label className="text-white font-semibold block mb-2">Genres</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="bg-pink-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                                    onClick={() => handleRemoveGenre(genre)}
                                >
                                    {genre} ✕
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                            value={newGenre}
                            onChange={(e) => setNewGenre(e.target.value)}
                            placeholder="Enter a genre and press Add"
                        />
                        <button
                            type="button"
                            onClick={handleAddGenre}
                            className="bg-blue-600 text-white p-2 rounded mt-2"
                        >
                            Add Genre
                        </button>
                    </div>

                    <div className='w-full space-y-5 bg-gray-800 p-6 rounded-lg'>
                        <label className="text-white font-semibold block mb-2">Social Links</label>
                        {['facebook', 'instagram', 'twitter', 'youtube'].map((platform) => (
                            <div key={platform} className="flex items-center gap-4 mb-2">
                                <span className="text-gray-400 w-24">{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                                <input
                                    type="text"
                                    className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
                                    value={socialLinks[platform]}
                                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                                />

                            </div>
                        ))}
                    </div>
                </div>

                <div className='md:w-[50%] space-y-5 bg-gray-800 p-6 rounded-lg'>
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
                </div>

                <div className="flex gap-10 w-[60%] mx-auto mt-10">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-pink-500 p-3 rounded-lg text-white font-bold transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'}`}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full bg-gray-600 p-3 rounded-lg text-white font-bold transition hover:bg-gray-700"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
