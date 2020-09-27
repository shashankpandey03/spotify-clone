export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    token: null,
    playlistTracks: null,
    curentPlayingItem: null,
    deviceId: null,
    audio: null,
    selectedPlayList: null,
}

//'BQBOIw8HMqM009KRToUxVU0vw7bdvwArUXk24DRnqlJOjvMzNshZ0AanuNGDtc0cfQ3E7D3DaQYYTxrvQf69VRFON0hsKmdj1nqx-1Oz4hIOSXimgdVu0OO-CJuANJuSrB9LghPLSITmD5YY6Y3AOJd2NO7NicvLndnyqMe0yT92YryPdRPnWso80-V3L8xlTg',

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case 'SELECTED_PLAYLIST':
            return {
                ...state,
                selectedPlayList: action.selectedPlayList,
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            }
        case 'SET_AUDIO':
            return {
                ...state,
                audio: action.audio,
            }
        case 'SET_DEVICE':
            return {
                ...state,
                deviceId: action.deviceId,
            }
        case 'SET_CURRENT_ITEM':
            return {
                ...state,
                curentPlayingItem : action.item
            }
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