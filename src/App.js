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
  const [{user}, dispatch] = useDataLayerValue();

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

      spotify.getMe().then(user => {
        console.log('User Info :', user);

        // Dispatching action to save user data in context/central state
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      })
    }
  }, []);

  return (
    <div>
      {
        token ? (
          <Player spotify={spotify}/>
        ) : (
            <Login />
          )
      }
    </div>
  );
}

export default App;
