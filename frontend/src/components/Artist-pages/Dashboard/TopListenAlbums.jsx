/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import cover1 from '../../../assets/cover/cover1.jpg';
import cover2 from '../../../assets/cover/cover2.jpg';
import cover3 from '../../../assets/cover/cover3.jpg';
import { GrFavorite } from "react-icons/gr";
import { IoAdd, IoPencil } from 'react-icons/io5';  // Import edit icon
import { Link } from 'react-router-dom';
import { MdCloudUpload } from 'react-icons/md';

const albums = [
    {
        id: 1,
        album: "Starlight",
        artist: "Luna",
        cover: cover1,
        songCount: 10,
        genre: "Pop",
        releaseDate: "Nov 4, 2023",
        likes: 520,
        tracks: [
            { trackNumber: 1, title: "Wave Rider", duration: "3:40" },
            { trackNumber: 2, title: "Sunset Groove", duration: "4:00" },
            { trackNumber: 3, title: "Seashell Dreams", duration: "3:30" },
            { trackNumber: 4, title: "Coral Nights", duration: "3:50" },
            { trackNumber: 5, title: "Tidal Dance", duration: "3:20" },
            { trackNumber: 6, title: "Ocean Melody", duration: "4:10" },
            { trackNumber: 7, title: "Beach Vibes", duration: "3:15" },
            { trackNumber: 8, title: "Ebb and Flow", duration: "4:05" }
        ]
    },
    {
        id: 2,
        album: "Ocean Breeze",
        artist: "Zephyr",
        cover: cover2,
        songCount: 8,
        genre: "Electro",
        releaseDate: "Oct 21, 2023",
        likes: 430,
        tracks: [
            { trackNumber: 1, title: "Wave Rider", duration: "3:40" },
            { trackNumber: 2, title: "Sunset Groove", duration: "4:00" },
            { trackNumber: 3, title: "Seashell Dreams", duration: "3:30" },
            { trackNumber: 4, title: "Coral Nights", duration: "3:50" },
            { trackNumber: 5, title: "Tidal Dance", duration: "3:20" },
            { trackNumber: 6, title: "Ocean Melody", duration: "4:10" },
            { trackNumber: 7, title: "Beach Vibes", duration: "3:15" },
            { trackNumber: 8, title: "Ebb and Flow", duration: "4:05" }
        ]
    },
    {
        id: 3,
        album: "Dark Horizons",
        artist: "Nova",
        cover: cover3,
        songCount: 12,
        genre: "R&B",
        releaseDate: "Sep 15, 2023",
        likes: 320,
        tracks: [
            { trackNumber: 1, title: "Wave Rider", duration: "3:40" },
            { trackNumber: 2, title: "Sunset Groove", duration: "4:00" },
            { trackNumber: 3, title: "Seashell Dreams", duration: "3:30" },
            { trackNumber: 4, title: "Coral Nights", duration: "3:50" },
            { trackNumber: 5, title: "Tidal Dance", duration: "3:20" },
            { trackNumber: 6, title: "Ocean Melody", duration: "4:10" },
            { trackNumber: 7, title: "Beach Vibes", duration: "3:15" },
            { trackNumber: 8, title: "Ebb and Flow", duration: "4:05" }
        ]
    },
];

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
    font-size: 22px;
    color: white;
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
`;

const durationContainerStyle = css`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const TopListenAlbum = () => {
    return (
        <div className='mt-10'>
            <div className='flex justify-between'>
                <h1 className='text-white text-3xl font-bold'>
                    Top Listen <span className='text-pink-500'>Albums</span>
                </h1>
                <Link to="/artist/create-album" className='text-white flex gap-2 items-center self-end mr-3 mb-3 hover:bg-pink-700 transition-all text-lg py-3 px-4 rounded-lg bg-pink-600'>
                <MdCloudUpload size={20} />Upload Album
                </Link>
            </div>
            <table css={tableStyle}>
                <thead>
                    <tr>
                        <th css={thStyle}></th>
                        <th css={thStyle}></th>
                        <th css={thStyle}>Release Date</th>
                        <th css={thStyle}>Genre</th>
                        <th css={thStyle}>Total Songs</th>
                        <th css={thStyle}>Total Likes</th>
                        <th css={thStyle}></th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map(album => (
                        <tr key={album.id} css={rowStyle}>
                            <td css={tdHasta}>#{album.id}</td>
                            <td css={tdStyle}>
                                <div css={coverContainerStyle} className='relative'>
                                    <Link to={`/album/${album.id}`}>
                                        <img src={album.cover} className='rounded-lg' alt={album.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    </Link>
                                    <div css={detailsContainerStyle}>
                                        <div className='text-lg font-medium'>{album.album}</div>
                                        <div className='text-md text-gray-400'>{album.artist}</div>
                                    </div>
                                </div>
                            </td>
                            <td css={tdStyle}>{album.releaseDate}</td>
                            <td css={tdStyle}>{album.genre}</td>
                            <td css={tdStyle}>
                                <div css={durationContainerStyle}>
                                    <span>{album.songCount} Songs</span>
                                </div>
                            </td>
                            <td css={tdStyle}>
                                <div css={durationContainerStyle}>
                                    <GrFavorite className='text-pink-500' /> {/* Heart icon for likes */}
                                    <span>{album.likes}</span>
                                </div>
                            </td>
                            <td css={tdStyle}>
                                <Link to={`/edit-album/${album.id}`} className="text-gray-400 hover:text-gray-100">
                                    <IoPencil size={24} /> {/* Edit icon */}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-5'>
                <button className='flex bg-gray-800 py-2 px-4 rounded-lg text-white items-center'>
                    <IoAdd size={30} /> View All Albums
                </button>
            </div>
        </div>
    );
};

export default TopListenAlbum;



