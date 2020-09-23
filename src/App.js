import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './login/Login';
import { getTokenFromUrl } from './spotify/spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './player/Player';
import { useDataLayerValue } from './datalayer/DataLayer';

const spotify = new SpotifyWebApi();

function App() {

  const [token, setToken] = useState(null);
  const [{user, playlists}, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);

      // Dispatching action to save token in context/central state
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      // Fetch user info from spotify
      spotify.getMe().then(user => {
        console.log('User Info :', user);

        // Dispatching action to save user data in context/central state
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      })

      // Fetch playlist info from spotify
      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLIST',
          playlist : playlists,
        });

        // Get recommendations from spotify for playlist at index 0
        spotify.getPlaylistTracks(playlists?.items[0].id).then(playlistTracks => {
          dispatch({
            type: 'SET_PLAYLIST_TRACKS',
            playlistTracks : playlistTracks,
          });
          console.log('Eminem playlist : ', playlistTracks);
        });
      });
    }
  }, []);

  return (
    <div>
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
            // <Login />
            <Player spotify={spotify}/>
          )
      }
    </div>
  );
}

export default App;
