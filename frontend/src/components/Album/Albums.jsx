/* eslint-disable react/no-unknown-property */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GrFavorite } from "react-icons/gr";
import { IoAdd } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { fetchAlbumsStart } from "../../../redux/features/album/albumSlice";
import { useEffect } from 'react';
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

const Albums = () => {
    const dispatch = useDispatch();
    const { albums, loading, error } = useSelector((state) => state.album);

    useEffect(() => {
        dispatch(fetchAlbumsStart());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
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
                    {albums?.albums?.map((album, index) => (
                        <tr key={album._id} css={rowStyle}>
                            <td css={tdHasta}>#{index + 1}</td>
                            <td css={tdStyle}>
                                <div css={coverContainerStyle} className='relative'>
                                    <Link to={`/album/${album.id}`}>
                                        <img src={album.coverImageUrl} className='rounded-lg' alt={album.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    </Link>
                                    <div css={detailsContainerStyle}>
                                        <div className='text-lg font-medium'>{album.title}</div>
                                        <div className='text-md text-gray-400'>{album.artist?.user?.name || "Unknown Artist"}</div>
                                    </div>
                                </div>
                            </td>
                            <td css={tdStyle}>{new Date(album.createdAt).toLocaleDateString()}</td>
                            <td css={tdStyle}>{album.genre || "Unknown Genre"}</td>
                            <td css={tdStyle}>
                                <div css={durationContainerStyle}>
                                    <span>{album.songs?.length || 0} Songs</span>
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
