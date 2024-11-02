import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { uploadAlbumRequest } from '../../../../redux/features/album/albumSlice';

const AlbumUpload = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [coverPreview, setCoverPreview] = useState(null);
    const [songFiles, setSongFiles] = useState([]);
    const [songDetails, setSongDetails] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const initialValues = {
        title: '',
        genre: '',
        coverImage: null,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Album title is required'),
        genre: Yup.string().required('Genre is required'),
        coverImage: Yup.mixed().required('Cover image is required'),
    });

    const handleSubmit = async (values) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('genre', values.genre);
    
        songFiles.forEach((song, index) => {
            formData.append('songs', song);
            formData.append('songsDetails', JSON.stringify(songDetails[index]));
        });
    
        const coverImageBase64 = await fileToBase64(values.coverImage);
        formData.append('coverImage', coverImageBase64);
    
        const artistId = user.user.artistId;
        try {
            await dispatch(uploadAlbumRequest({ artistId, formData }));
            // Clear state if needed
            setCoverPreview(null);
            setSongFiles([]);
            setSongDetails([]);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleCoverImageChange = (event, setFieldValue) => {
        const file = event.currentTarget.files[0];
        if (file) {
            setCoverPreview(URL.createObjectURL(file));
            setFieldValue('coverImage', file);
        }
    };

    const handleSongFilesChange = (event) => {
        const files = Array.from(event.currentTarget.files);
        const validFiles = files.filter(file => file.type.startsWith('audio/'));

        if (validFiles.length > 0) {
            const newSongDetails = validFiles.map(() => ({ title: '', genre: '' })); // Prepare song details
            setSongFiles(prev => [...prev, ...validFiles]);
            setSongDetails(prev => [...prev, ...newSongDetails]);
            event.currentTarget.value = '';
        } else {
            alert('Please upload valid audio files');
        }
    };

    const updateSongDetail = (index, field, value) => {
        setSongDetails(prev => {
            const updatedDetails = [...prev];
            updatedDetails[index][field] = value;
            return updatedDetails;
        });
    };

    const removeSongFile = (index) => {
        setSongFiles(prev => prev.filter((_, i) => i !== index));
        setSongDetails(prev => prev.filter((_, i) => i !== index));
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="mx-auto p-6 rounded-lg">
            <h1 className='text-white text-3xl font-bold mb-6'>
                Album <span className='text-pink-500'>Upload</span>
            </h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue }) => (
                    <Form className="space-y-6 bg-gray-800 text-white p-6 rounded-xl">
                        <div className='mx-auto'>
                            <div>
                                <label className='text-white font-semibold text-xl block mb-2'>Album Title</label>
                                <Field
                                    type="text"
                                    placeholder="Album Title"
                                    name="title"
                                    className="p-2 rounded-lg w-[80%] md:w-[50%] bg-gray-700 text-white focus:outline-none"
                                />
                                <ErrorMessage name="title" component="div" className="error text-red-800" />
                            </div>

                            <div>
                                <label className='text-white font-semibold text-xl block mb-2'>Genre</label>
                                <Field
                                    type="text"
                                    name="genre"
                                    className="p-2 rounded-lg w-[80%] md:w-[50%] bg-gray-700 text-white focus:outline-none"
                                />
                                <ErrorMessage name="genre" component="div" className="error text-red-800" />
                            </div>

                            <div className="file-upload-section mt-5">
                                <label className='text-white font-semibold text-xl block mb-2'>Song Files</label>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleSongFilesChange}
                                    id="song-files"
                                />
                                <label htmlFor="song-files" className="block cursor-pointer">
                                    <div className="relative w-[300px] h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                        <div className="absolute flex flex-col items-center">
                                            <img
                                                alt="File Icon"
                                                className="mb-3"
                                                src="https://img.icons8.com/dusk/64/000000/file.png"
                                            />
                                            <span className="block text-gray-500 font-semibold">
                                                Drag & drop your song files here
                                            </span>
                                            <span className="block text-gray-400 font-normal mt-1">
                                                or click to upload
                                            </span>
                                        </div>
                                    </div>
                                </label>

                                {songFiles.length > 0 && (
                                    <div className="mt-4">
                                        <h2 className='text-white font-semibold'>Uploaded Songs:</h2>
                                        {songFiles.map((_, index) => (
                                            <div key={index} className="flex items-center mt-2">
                                                <input
                                                    type="text"
                                                    placeholder="Song Title"
                                                    value={songDetails[index].title}
                                                    onChange={(e) => updateSongDetail(index, 'title', e.target.value)}
                                                    className="p-1 rounded-lg bg-gray-700 text-white mr-2"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Genre"
                                                    value={songDetails[index].genre}
                                                    onChange={(e) => updateSongDetail(index, 'genre', e.target.value)}
                                                    className="p-1 rounded-lg bg-gray-700 text-white mr-2"
                                                />
                                                <audio controls src={URL.createObjectURL(songFiles[index])} className="mr-2" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSongFile(index)}
                                                    className="bg-red-500 text-white rounded py-1 px-2"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <ErrorMessage name="songs" component="div" className="error" />
                            </div>

                            <div className="file-upload-section mt-5">
                                <label className='text-white font-semibold text-xl block mb-2'>Cover Image</label>
                                {coverPreview ? (
                                    <>
                                        <img src={coverPreview} alt="Cover Preview" className="w-48 h-48 rounded-lg" />
                                        <button
                                            type="button"
                                            className="bg-blue-500 text-white py-1 px-4 rounded mt-2"
                                            onClick={() => {
                                                setCoverPreview(null);
                                                setFieldValue("coverImage", null);
                                            }}
                                        >
                                            Replace Image
                                        </button>
                                    </>
                                ) : (
                                    <label className="custum-file-upload" htmlFor="coverImage">
                                        <div className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24">
                                                <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" />
                                            </svg>
                                        </div>
                                        <span>Click to Upload Cover</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="coverImage"
                                            className="hidden"
                                            onChange={(event) => handleCoverImageChange(event, setFieldValue)}
                                        />
                                    </label>
                                )}
                                <ErrorMessage name="coverImage" component="div" className="error" />
                            </div>

                            {uploading ? (
                                <div className="text-yellow-500">Uploading...</div>
                            ) : (
                                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mt-6">
                                    Upload Album
                                </button>
                            )}
                            {error && <div className="text-red-500 mt-4">{error}</div>}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AlbumUpload;
