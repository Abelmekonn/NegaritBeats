/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/react';
import { GrFavorite } from "react-icons/gr";
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa6';
import MusicPlayerContext from '../../context/MusicPlayerContext'; // Import the context
import { fetchSongsStart } from '../../../redux/features/Song/songSlice';
import { useDispatch, useSelector } from 'react-redux';


const tableStyle = css`
    width: 100%;
    border-collapse: collapse; 
    margin-top: 20px;
`;

const thStyle = css`
    color: white;
    padding: 10px;
    text-align: left;
    font-size: 20px;
`;

const tdStyle = css`
    color: white;
    padding: 10px;
`;

const tdHasta = css`
    font-size: 25px;
    color: white;
`;

const rowStyle = css`
    margin: 10px 0;
    cursor: pointer; /* Makes rows clickable */
    border-radius : 20px;
    &:hover {
        background-color: #444; /* Changes background on hover */
        transition: background-color 0.3s ease; /* Smooth transition */
    }
`;

const coverContainerStyle = css`
    display: flex;
    align-items: center;
`;

const detailsContainerStyle = css`
    margin-left: 10px;
`;

const durationContainerStyle = css`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const SingleArtistMusics = ({ id }) => {
    const { playTrack } = useContext(MusicPlayerContext); // Access playTrack from context
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector((state) => state.songs);

    useEffect(() => {
        dispatch(fetchSongsStart());
    }, [dispatch]);

    const filteredSongs = Array.isArray(songs.songs)
        ? songs.songs.reduce((acc, song) => {
            if (song.artist._id === id) {
                acc.push(song);
            }
            return acc;
        }, [])
        : [];
        

    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Popular <span className='text-pink-500'>Songs</span>
            </h1>
            <table css={tableStyle}>
                <thead>
                    <tr>
                        <th css={thStyle}></th>
                        <th css={thStyle}></th>
                        <th css={thStyle}>Release Date</th>
                        <th css={thStyle}>Album</th>
                        <th css={thStyle}>Duration</th>
                    </tr>
                </thead>
                <tbody >
                    {filteredSongs.map(song => (
                        <tr key={song._id} css={rowStyle} onClick={() => handleRowClick(song)}>
                            <td css={tdHasta}>#</td>
                            <td css={tdStyle}>
                                <div css={coverContainerStyle} className='relative'>
                                    <img src={song.coverImageUrl} className='rounded-lg' alt={song.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    <div
                                        className='text-pink-600 absolute  p-4 bg-[#00000080] rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-all  items-center justify-center'
                                        onClick={() => playTrack(song)} // Pass the song to the player context
                                    >
                                        <FaPlay size={20} />
                                    </div>
                                    <div css={detailsContainerStyle}>
                                        <div className='text-lg font-medium'>{song.title}</div>
                                        <div className='text-md text-gray-400'>{song.artist.user.name }</div>
                                    </div>
                                </div>
                            </td>
                            <td css={tdStyle}>{new Date(song.createdAt).toLocaleDateString()}</td>
                            <td css={tdStyle}>{song.genre}</td>
                            <td css={tdStyle}>
                                <div css={durationContainerStyle}>
                                    <GrFavorite className='text-pink-600' />
                                    <span>{song.likes}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-5'>
                <button className='flex bg-pink-600 py-2 px-4 rounded-lg text-white items-center'>
                    <IoAdd size={30} /> View All
                </button>
            </div>
        </div>
    )
}

export default SingleArtistMusics;
