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
    //const _token = 'BQBOIw8HMqM009KRToUxVU0vw7bdvwArUXk24DRnqlJOjvMzNshZ0AanuNGDtc0cfQ3E7D3DaQYYTxrvQf69VRFON0hsKmdj1nqx-1Oz4hIOSXimgdVu0OO-CJuANJuSrB9LghPLSITmD5YY6Y3AOJd2NO7NicvLndnyqMe0yT92YryPdRPnWso80-V3L8xlTg';
    //hash.access_token;

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

      // spotify.getMyDevices().then((res) => {
      //   dispatch({
      //     type: 'SET_DEVICE',
      //     deviceId: res.devices[0].id,
      //   });
      // })

      // Fetch playlist info from spotify
      spotify.getUserPlaylists().then(playlists => {
        dispatch({
          type: 'SET_PLAYLIST',
          playlist : playlists,
        });
        dispatch({
          type: 'SELECTED_PLAYLIST',
          selectedPlayList : playlists.items[0],
        })
      });
    }
  }, []);

  return (
    <div>
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
            <Login />
            //<Player spotify={spotify}/>
          )
      }
    </div>
  );
}

export default App;
