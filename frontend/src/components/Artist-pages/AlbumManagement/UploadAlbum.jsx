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
    
        // Add song files and their details to formData
        songFiles.forEach((song, index) => {
            formData.append('songs', song);
        });
        
        // Send the songsDetails as a single JSON string
        formData.append('songsDetails', JSON.stringify(songDetails));
    
        const coverImageBase64 = await fileToBase64(values.coverImage);
        formData.append('coverImage', coverImageBase64);
    
        const artistId = user.user.artistId;
    
        try {
            await dispatch(uploadAlbumRequest({ artistId, formData }));
        } catch (err) {
            console.error('Error response:', err.response);
            setError(err.response?.data?.message || 'An error occurred while uploading the album.');
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
            const newSongDetails = validFiles.map(() => ({ title: '', genre: '' }));
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
                    <Form className="space-y-6 bg-gray-800 text-white p-10 rounded-xl">
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
                                className="hidden  w-[300px] h-48"
                                onChange={handleSongFilesChange}
                                id="song-files"
                            />
                            <label htmlFor="song-files" className="block cursor-pointer">
                                <div className="relative w-[300px] h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                    <div className="absolute flex flex-col items-center">
                                        <span className="block text-gray-500 font-semibold">Drag & drop your song files here</span>
                                        <span className="block text-gray-400 font-normal mt-1">or click to upload</span>
                                    </div>
                                </div>
                            </label>

                            {songFiles.length > 0 && (
                                <div className="mt-4">
                                    <h2 className='text-white font-semibold'>Uploaded Songs:</h2>
                                    {songFiles.map((_, index) => (
                                        <div key={index} className="flex flex-wrap gap-3 items-center  mt-10">
                                            <input
                                                type="text"
                                                placeholder="Song Title"
                                                value={songDetails[index].title}
                                                onChange={(e) => updateSongDetail(index, 'title', e.target.value)}
                                                className="p-3 rounded-lg bg-gray-700 text-white mr-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Genre"
                                                value={songDetails[index].genre}
                                                onChange={(e) => updateSongDetail(index, 'genre', e.target.value)}
                                                className="p-3 rounded-lg bg-gray-700 text-white mr-2"
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
                                        <span>Click to Upload Cover</span>
                                    </div>
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
                            <div className="bg-pink-950 w-full text-white rounded px-4 py-2 mt-10">Uploading...</div>
                        ) : (
                            <button type="submit" className="bg-pink-600 w-full text-white rounded px-4 py-2 mt-10">
                                Upload Album
                            </button>
                        )}
                        {error && <div className="text-red-500 mt-4">{error}</div>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AlbumUpload;
