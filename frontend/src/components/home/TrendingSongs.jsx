/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useContext, useEffect } from 'react';
import { GrFavorite } from "react-icons/gr";
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from "react-icons/fa";
import MusicPlayerContext from '../../context/MusicPlayerContext';
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

    @media (max-width: 640px) {
        font-size: 16px;
    }
`;

const tdStyle = css`
    color: white;
    padding: 10px;

    @media (max-width: 640px) {
        font-size: 14px;
    }
`;

const tdHasta = css`
    font-size: 22px;
    color: white;

    @media (max-width: 640px) {
        font-size: 18px;
    }
`;

const rowStyle = css`
    margin: 10px 0;
`;

const coverContainerStyle = css`
    display: flex;
    align-items: center;
`;

const detailsContainerStyle = css`
    margin-left: 10px;

    .title {
        font-size: 18px;

        @media (max-width: 640px) {
            font-size: 14px;
        }
    }

    .artist {
        font-size: 16px;
        color: gray;

        @media (max-width: 640px) {
            font-size: 12px;
        }
    }
`;

const durationContainerStyle = css`
    display: flex;
    align-items: center;
    gap: 5px;
`;





const TrendingSongs = () => {
    const { playTrack } = useContext(MusicPlayerContext);
    const dispatch = useDispatch();
    const { songs, loading, error } = useSelector((state) => state.songs);

    useEffect(() => {
        dispatch(fetchSongsStart());
    }, [dispatch]);
    console.log(songs)

    return (
        <div>
            <h1 className='text-white text-3xl font-bold'>
                Trending <span className='text-pink-500'>Songs</span>
            </h1>
            <table css={tableStyle}>
                <thead>
                    <tr>
                        <th css={thStyle}></th>
                        <th css={thStyle}></th>
                        <th css={thStyle}>Release Date</th>
                        <th css={thStyle}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {songs && songs.songs.length > 0 ? (
                        songs.songs.map((song, index) => (
                            <tr key={song._id} css={rowStyle}>
                                <td css={tdHasta}>#{index + 1}</td>
                                <td css={tdStyle}>
                                    <div css={coverContainerStyle} className='relative'>
                                        <img src={song.coverImageUrl} className='rounded-lg' alt={song.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                        <div
                                            className='text-pink-600 absolute p-4 bg-[#00000080] rounded-full cursor-pointer items-center justify-center'
                                            onClick={() => playTrack(song)}
                                        >
                                            <FaPlay size={20} />
                                        </div>
                                        <div css={detailsContainerStyle}>
                                            <div className='title'>{song.title}</div>
                                            <div className='artist'>{song.artist.user.name || "Unknown Artist"}</div> {/* Adjusted artist property */}
                                        </div>
                                    </div>
                                </td>
                                <td css={tdStyle}>{new Date(song.createdAt).toLocaleDateString()}</td>
                                <td css={tdStyle}>
                                    <div css={durationContainerStyle}>
                                        <GrFavorite className='text-pink-600' />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" css={tdStyle}>
                                {loading ? "Loading..." : error ? error : "No songs available"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-5'>
                <button className='flex bg-gray-800 py-2 px-4 rounded-lg text-white items-center'>
                    <IoAdd size={30} /> View All
                </button>
            </div>
        </div>
    );
};

export default TrendingSongs;
