/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import cover1 from '../../assets/cover/cover1.jpg';
import cover2 from '../../assets/cover/cover2.jpg';
import cover3 from '../../assets/cover/cover3.jpg';
import cover4 from '../../assets/cover/cover4.jpg';
import cover5 from '../../assets/cover/cover5.jpg';
import cover6 from '../../assets/cover/cover6.jpg';
import { GrFavorite } from "react-icons/gr";
import { IoAdd } from 'react-icons/io5';

const songs = [
    {
        id: 1,
        title: "Night Sky Dreams",
        artist: "Luna",
        cover: cover1,
        album: "Starlight",
        duration: "3:45",
        genre: "Pop",
        releaseDate: "Nov 4, 2023"
    },
    {
        id: 2,
        title: "Electric Waves",
        artist: "Zephyr",
        cover: cover2,
        album: "Ocean Breeze",
        duration: "4:12",
        genre: "Electro",
        releaseDate: "Oct 21, 2023"
    },
    {
        id: 3,
        title: "Midnight Escape",
        artist: "Nova",
        cover: cover3,
        album: "Dark Horizons",
        duration: "3:33",
        genre: "R&B",
        releaseDate: "Sep 15, 2023"
    },
    {
        id: 4,
        title: "City Lights",
        artist: "Neon",
        cover: cover4,
        album: "Urban Soul",
        duration: "4:01",
        genre: "Hip-Hop",
        releaseDate: "Aug 28, 2023"
    },
    {
        id: 5,
        title: "Golden Hour",
        artist: "Aurora",
        cover: cover5,
        album: "Sunset Vibes",
        duration: "2:58",
        genre: "Indie",
        releaseDate: "Jul 12, 2023"
    },
    {
        id: 6,
        title: "Lost in Paradise",
        artist: "Eclipse",
        cover: cover6,
        album: "Dreamscapes",
        duration: "3:50",
        genre: "Alternative",
        releaseDate: "Jun 18, 2023"
    }
];
const tableStyle = css`
    width: 100%;
    border-collapse: collapse; /* Ensures that there are no gaps between cells */
    margin-top: 20px;
`;

const thStyle = css`
    color: white;
    padding: 10px;
    text-align: left;
    font-size: 20px; /* Set font size to 18px */
`;

const tdStyle = css`
    color: white;
    padding: 10px;
`;

const tdHasta= css`
    font-size: 22px; /* Set font size to 18px */
    color: white;
`

const rowStyle = css`
    margin: 10px 0; /* Margin for top and bottom of the row */
`;

const coverContainerStyle = css`
    display: flex;
    align-items: center;
`;

const detailsContainerStyle = css`
    margin-left: 10px; /* Adds some space between cover and text */
`;

const durationContainerStyle = css`
    display: flex;
    align-items: center;
    gap: 5px; /* Adds space between the icon and duration text */
`;

const SingleArtistMusics = () => {
    return (
        <div className=''>
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
                <tbody>
                    {songs.map(song => (
                        <tr key={song.id} css={rowStyle}>
                            <td css={tdHasta}>#{song.id}</td>
                            <td css={tdStyle}>
                                <div css={coverContainerStyle}>
                                    <img src={song.cover} className='rounded-lg' alt={song.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    <div css={detailsContainerStyle}>
                                        <div className='text-lg font-medium'>{song.title}</div>
                                        <div className='text-md text-gray-400'>{song.artist}</div>
                                    </div>
                                </div>
                            </td>
                            <td css={tdStyle}>{song.releaseDate}</td>
                            <td css={tdStyle}>{song.album}</td>
                            <td css={tdStyle} >
                                <div css={durationContainerStyle}>
                                    <GrFavorite className='text-pink-600' />
                                    <span>{song.duration}</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-full flex justify-center mt-5'>
                <button className='flex bg-pink-600 py-2 px-4 rounded-lg text-white items-center'>
                    <IoAdd size={30}/> View All
                </button>
            </div>
        </div>
    )
}

export default SingleArtistMusics