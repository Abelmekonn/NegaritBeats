/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import cover6 from '../../assets/cover/cover6.jpg';
import { GrFavorite } from "react-icons/gr";
import { IoAdd } from 'react-icons/io5';
import { Link } from 'react-router-dom';


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
            { trackNumber: 1, title: "Dancing Stars", duration: "3:30" },
            { trackNumber: 2, title: "Whispers in the Dark", duration: "4:15" },
            { trackNumber: 3, title: "Celestial Nights", duration: "3:45" },
            { trackNumber: 4, title: "Dreams in Motion", duration: "2:50" },
            { trackNumber: 5, title: "Skyline", duration: "3:55" },
            { trackNumber: 6, title: "Starlit Path", duration: "4:00" },
            { trackNumber: 7, title: "Moonlight Serenade", duration: "3:20" },
            { trackNumber: 8, title: "Euphoria", duration: "3:10" },
            { trackNumber: 9, title: "Endless Horizons", duration: "4:25" },
            { trackNumber: 10, title: "Final Frontier", duration: "3:40" }
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
        tracks: [
            { trackNumber: 1, title: "Lost in the Night", duration: "3:40" },
            { trackNumber: 2, title: "Midnight Calling", duration: "4:25" },
            { trackNumber: 3, title: "Shadows Dance", duration: "3:50" },
            { trackNumber: 4, title: "Embers", duration: "4:05" },
            { trackNumber: 5, title: "Heartbeats", duration: "3:35" },
            { trackNumber: 6, title: "Moonlit Whispers", duration: "4:15" },
            { trackNumber: 7, title: "Silhouettes", duration: "3:25" },
            { trackNumber: 8, title: "Intimate Moments", duration: "3:55" },
            { trackNumber: 9, title: "Fading Light", duration: "4:00" },
            { trackNumber: 10, title: "Eternal Echoes", duration: "3:45" },
            { trackNumber: 11, title: "Hidden Depths", duration: "4:20" },
            { trackNumber: 12, title: "Revelations", duration: "3:30" }
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
            { trackNumber: 1, title: "City Dreams", duration: "3:30" },
            { trackNumber: 2, title: "Concrete Jungle", duration: "4:10" },
            { trackNumber: 3, title: "Street Lights", duration: "3:55" },
            { trackNumber: 4, title: "Rhythm of the City", duration: "4:20" },
            { trackNumber: 5, title: "Life in the Fast Lane", duration: "3:40" },
            { trackNumber: 6, title: "Graffiti Walls", duration: "3:50" },
            { trackNumber: 7, title: "Urban Legends", duration: "4:05" },
            { trackNumber: 8, title: "Bounce Back", duration: "3:25" },
            { trackNumber: 9, title: "Living Free", duration: "3:35" },
            { trackNumber: 10, title: "Vibe Check", duration: "3:45" },
            { trackNumber: 11, title: "City Nights", duration: "3:50" },
            { trackNumber: 12, title: "Unstoppable", duration: "4:00" },
            { trackNumber: 13, title: "Soul Search", duration: "3:30" },
            { trackNumber: 14, title: "Legacy", duration: "3:45" },
            { trackNumber: 15, title: "Final Beat", duration: "4:10" }
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
            { trackNumber: 1, title: "Sunset Dreams", duration: "3:20" },
            { trackNumber: 2, title: "Breeze", duration: "2:55" },
            { trackNumber: 3, title: "Golden Hour", duration: "3:15" },
            { trackNumber: 4, title: "Waves", duration: "3:10" },
            { trackNumber: 5, title: "Chasing Light", duration: "4:00" },
            { trackNumber: 6, title: "Serenade", duration: "3:30" },
            { trackNumber: 7, title: "Nature's Call", duration: "3:40" },
            { trackNumber: 8, title: "Free Spirit", duration: "3:55" },
            { trackNumber: 9, title: "Infinite Sky", duration: "3:25" }
        ]
    },
    {
        id: 6,
        album: "Dreamscapes",
        artist: "Eclipse",
        cover: cover6,
        songCount: 11,
        genre: "Alternative",
        releaseDate: "Jun 18, 2023",
        tracks: [
            { trackNumber: 1, title: "Lost in Dreams", duration: "3:35" },
            { trackNumber: 2, title: "Awakening", duration: "4:15" },
            { trackNumber: 3, title: "Dreamwalker", duration: "3:45" },
            { trackNumber: 4, title: "Visions", duration: "4:05" },
            { trackNumber: 5, title: "Echoes of Time", duration: "3:55" },
            { trackNumber: 6, title: "Path to Serenity", duration: "4:10" },
            { trackNumber: 7, title: "Chasing Shadows", duration: "3:30" },
            { trackNumber: 8, title: "Fantasy", duration: "3:40" },
            { trackNumber: 9, title: "Solstice", duration: "4:20" },
            { trackNumber: 10, title: "Awakening", duration: "3:25" },
            { trackNumber: 11, title: "Final Dream", duration: "4:00" }
        ]
    },
    {
        id: 7,
        album: "Eternal Echoes",
        artist: "Horizon",
        cover: cover1,
        songCount: 14,
        genre: "Ambient",
        releaseDate: "May 30, 2023",
        tracks: [
            { trackNumber: 1, title: "Whispers of Time", duration: "3:40" },
            { trackNumber: 2, title: "Stillness", duration: "4:20" },
            { trackNumber: 3, title: "Ocean of Stars", duration: "3:50" },
            { trackNumber: 4, title: "Floating", duration: "4:05" },
            { trackNumber: 5, title: "Celestial Voyage", duration: "3:30" },
            { trackNumber: 6, title: "Driftwood", duration: "3:45" },
            { trackNumber: 7, title: "Light of the Dawn", duration: "4:00" },
            { trackNumber: 8, title: "Infinite Horizon", duration: "3:35" },
            { trackNumber: 9, title: "Echoes of Silence", duration: "3:25" },
            { trackNumber: 10, title: "Serenity", duration: "4:10" },
            { trackNumber: 11, title: "Last Breath", duration: "3:20" },
            { trackNumber: 12, title: "Eternal Light", duration: "4:25" },
            { trackNumber: 13, title: "Solitude", duration: "3:40" },
            { trackNumber: 14, title: "Final Echo", duration: "4:00" }
        ]
    },
    {
        id: 8,
        album: "Rhythm & Soul",
        artist: "Serenity",
        cover: cover2,
        songCount: 10,
        genre: "Soul",
        releaseDate: "Apr 15, 2023",
        tracks: [
            { trackNumber: 1, title: "Soulful Dawn", duration: "3:30" },
            { trackNumber: 2, title: "Rhythm of Love", duration: "4:00" },
            { trackNumber: 3, title: "Groove in the Heart", duration: "3:45" },
            { trackNumber: 4, title: "Melodic Journey", duration: "4:15" },
            { trackNumber: 5, title: "Emotional Ties", duration: "3:20" },
            { trackNumber: 6, title: "Legacy of Souls", duration: "3:55" },
            { trackNumber: 7, title: "In Your Arms", duration: "4:05" },
            { trackNumber: 8, title: "Heart of the City", duration: "3:30" },
            { trackNumber: 9, title: "Endless Emotions", duration: "4:10" },
            { trackNumber: 10, title: "Final Embrace", duration: "3:45" }
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

const Albums = () => {
    return (
        <div className=''>
            <h1 className='text-white text-3xl font-bold'>
                Trending <span className='text-pink-500'>Albums</span>
            </h1>
            <table css={tableStyle}>
                <thead>
                    <tr>
                        <th css={thStyle}></th>
                        <th css={thStyle}></th>
                        <th css={thStyle}>Release Date</th>
                        <th css={thStyle}>Genre</th>
                        <th css={thStyle}>Total Songs</th>
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
                        </tr>
                    ))}
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

export default Albums;
