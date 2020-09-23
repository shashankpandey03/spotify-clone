export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    playlistTracks: null,
}


const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        case 'SET_PLAYLIST':
            return {
                ...state,
                playlists: action.playlist,
            }
        case 'SET_PLAYLIST_TRACKS':
            return {
                ...state,
                playlistTracks: action.playlistTracks,
            }
        default:
            return state;
    }
};

export default reducer;