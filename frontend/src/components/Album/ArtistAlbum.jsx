/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { css } from '@emotion/react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import cover6 from '../../assets/cover/cover6.jpg';
import { GrFavorite } from "react-icons/gr";
import { IoAdd } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa6';
import MusicPlayerContext from '../../context/MusicPlayerContext'; // Import the context
import { useParams } from 'react-router-dom';
import SingleAlbumBanner from './SingleAlbumBanner';


const albums = [
    {
        id: 1,
        album: "Starlight",
        artist: "Luna",
        cover: cover1,
        songCount: 10,
        genre: "Pop",
        releaseDate: "Nov 4, 2023",
        tracks: [
            { trackNumber: 1, cover: cover1, title: "Dancing Stars", duration: "3:30", artist: "Luna" },
            { trackNumber: 2, cover: cover1, title: "Whispers in the Dark", duration: "4:15", artist: "Luna" },
            { trackNumber: 3, cover: cover1, title: "Celestial Nights", duration: "3:45", artist: "Luna" },
            { trackNumber: 4, cover: cover1, title: "Dreams in Motion", duration: "2:50", artist: "Luna" },
            { trackNumber: 5, cover: cover1, title: "Skyline", duration: "3:55", artist: "Luna" },
            { trackNumber: 6, cover: cover1, title: "Starlit Path", duration: "4:00", artist: "Luna" },
            { trackNumber: 7, cover: cover1, title: "Moonlight Serenade", duration: "3:20", artist: "Luna" },
            { trackNumber: 8, cover: cover1, title: "Euphoria", duration: "3:10", artist: "Luna" },
            { trackNumber: 9, cover: cover1, title: "Endless Horizons", duration: "4:25", artist: "Luna" },
            { trackNumber: 10, cover: cover1, title: "Final Frontier", duration: "3:40", artist: "Luna" }
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
        tracks: [
            { trackNumber: 1, cover: cover2, title: "Wave Rider", duration: "3:40", artist: "Zephyr" },
            { trackNumber: 2, cover: cover2, title: "Sunset Groove", duration: "4:00", artist: "Zephyr" },
            { trackNumber: 3, cover: cover2, title: "Seashell Dreams", duration: "3:30", artist: "Zephyr" },
            { trackNumber: 4, cover: cover2, title: "Coral Nights", duration: "3:50", artist: "Zephyr" },
            { trackNumber: 5, cover: cover2, title: "Tidal Dance", duration: "3:20", artist: "Zephyr" },
            { trackNumber: 6, cover: cover2, title: "Ocean Melody", duration: "4:10", artist: "Zephyr" },
            { trackNumber: 7, cover: cover2, title: "Beach Vibes", duration: "3:15", artist: "Zephyr" },
            { trackNumber: 8, cover: cover2, title: "Ebb and Flow", duration: "4:05", artist: "Zephyr" }
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
        tracks: [
            { trackNumber: 1, cover: cover3, title: "Lost in the Night", duration: "3:40", artist: "Nova" },
            { trackNumber: 2, cover: cover3, title: "Midnight Calling", duration: "4:25", artist: "Nova" },
            { trackNumber: 3, cover: cover3, title: "Shadows Dance", duration: "3:50", artist: "Nova" },
            { trackNumber: 4, cover: cover3, title: "Embers", duration: "4:05", artist: "Nova" },
            { trackNumber: 5, cover: cover3, title: "Heartbeats", duration: "3:35", artist: "Nova" },
            { trackNumber: 6, cover: cover3, title: "Moonlit Whispers", duration: "4:15", artist: "Nova" },
            { trackNumber: 7, cover: cover3, title: "Silhouettes", duration: "3:25", artist: "Nova" },
            { trackNumber: 8, cover: cover3, title: "Intimate Moments", duration: "3:55", artist: "Nova" },
            { trackNumber: 9, cover: cover3, title: "Fading Light", duration: "4:00", artist: "Nova" },
            { trackNumber: 10, cover: cover3, title: "Eternal Echoes", duration: "3:45", artist: "Nova" },
            { trackNumber: 11, cover: cover3, title: "Hidden Depths", duration: "4:20", artist: "Nova" },
            { trackNumber: 12, cover: cover3, title: "Revelations", duration: "3:30", artist: "Nova" }
        ]
    },
    {
        id: 4,
        album: "Urban Soul",
        artist: "Neon",
        cover: cover4,
        songCount: 15,
        genre: "Hip-Hop",
        releaseDate: "Aug 28, 2023",
        tracks: [
            { trackNumber: 1, cover: cover4, title: "City Dreams", duration: "3:30", artist: "Neon" },
            { trackNumber: 2, cover: cover4, title: "Concrete Jungle", duration: "4:10", artist: "Neon" },
            { trackNumber: 3, cover: cover4, title: "Street Lights", duration: "3:55", artist: "Neon" },
            { trackNumber: 4, cover: cover4, title: "Rhythm of the City", duration: "4:20", artist: "Neon" },
            { trackNumber: 5, cover: cover4, title: "Life in the Fast Lane", duration: "3:40", artist: "Neon" },
            { trackNumber: 6, cover: cover4, title: "Graffiti Walls", duration: "3:50", artist: "Neon" },
            { trackNumber: 7, cover: cover4, title: "Urban Legends", duration: "4:05", artist: "Neon" },
            { trackNumber: 8, cover: cover4, title: "Bounce Back", duration: "3:25", artist: "Neon" },
            { trackNumber: 9, cover: cover4, title: "Living Free", duration: "3:35", artist: "Neon" },
            { trackNumber: 10, cover: cover4, title: "Vibe Check", duration: "3:45", artist: "Neon" },
            { trackNumber: 11, cover: cover4, title: "City Nights", duration: "3:50", artist: "Neon" },
            { trackNumber: 12, cover: cover4, title: "Unstoppable", duration: "4:00", artist: "Neon" },
            { trackNumber: 13, cover: cover4, title: "Soul Search", duration: "3:30", artist: "Neon" },
            { trackNumber: 14, cover: cover4, title: "Legacy", duration: "3:45", artist: "Neon" },
            { trackNumber: 15, cover: cover4, title: "Final Beat", duration: "4:10", artist: "Neon" }
        ]
    },
    {
        id: 5,
        album: "Sunset Vibes",
        artist: "Aurora",
        cover: cover5,
        songCount: 9,
        genre: "Indie",
        releaseDate: "Jul 12, 2023",
        tracks: [
            { trackNumber: 1, cover: cover5, title: "Sunset Dreams", duration: "3:20", artist: "Aurora" },
            { trackNumber: 2, cover: cover5, title: "Breeze", duration: "2:55", artist: "Aurora" },
            { trackNumber: 3, cover: cover5, title: "Golden Hour", duration: "3:15", artist: "Aurora" },
            { trackNumber: 4, cover: cover5, title: "Waves", duration: "3:10", artist: "Aurora" },
            { trackNumber: 5, cover: cover5, title: "Chasing Light", duration: "4:00", artist: "Aurora" },
            { trackNumber: 6, cover: cover5, title: "Serenade", duration: "3:30", artist: "Aurora" },
            { trackNumber: 7, cover: cover5, title: "Evening Glow", duration: "3:40", artist: "Aurora" },
            { trackNumber: 8, cover: cover5, title: "Peaceful Nights", duration: "4:05", artist: "Aurora" },
            { trackNumber: 9, cover: cover5, title: "Quiet Echoes", duration: "3:50", artist: "Aurora" }
        ]
    }
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

const ArtistAlbum = ({ id }) => {
    const { playTrack } = useContext(MusicPlayerContext); // Access playTrack from context


    const albumId = Number(id);
    const album = albums.find(album => album.id === albumId); // Find the album by ID

    const totalTracks = album.tracks.length


    return (
        <div className='pt-20 flex flex-col gp-4'>
            <SingleAlbumBanner cover={album.cover} name={album.album} totalSongs={totalTracks} artist={album.artist} />

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
                    {album.tracks.map(song => (
                        <tr key={song.trackNumber} css={rowStyle} onClick={() => handleRowClick(song)}>
                            <td css={tdHasta}>#{song.trackNumber}</td>
                            <td css={tdStyle}>
                                <div css={coverContainerStyle} className='relative'>
                                    <img src={album.cover} className='rounded-lg' alt={song.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    <div
                                        className='text-pink-600 absolute  p-4 bg-[#00000080] rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-all  items-center justify-center'
                                        onClick={() => playTrack(song)} // Pass the song to the player context
                                    >
                                        <FaPlay size={20} />
                                    </div>
                                    <div css={detailsContainerStyle}>
                                        <div className='text-lg font-medium'>{song.title}</div>
                                        <div className='text-md text-gray-400'>{album.artist}</div>
                                    </div>
                                </div>
                            </td>
                            <td css={tdStyle}>{album.releaseDate}</td>
                            <td css={tdStyle}>{album.album}</td>
                            <td css={tdStyle}>
                                <div css={durationContainerStyle}>
                                    <GrFavorite className='text-pink-600' />
                                    <span>{song.duration}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ArtistAlbum;
