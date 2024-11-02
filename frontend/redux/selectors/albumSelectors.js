import { createSelector } from 'reselect';

const selectAlbumState = (state) => state.album;

export const selectUploading = createSelector(
    [selectAlbumState],
    (album) => album.uploading
);

export const selectError = createSelector(
    [selectAlbumState],
    (album) => album.error
);

// src/redux/selectors/userSelectors.js
const selectUserState = (state) => state.user;

export const selectUserArtistId = createSelector(
    [selectUserState],
    (user) => user.artistId
);
