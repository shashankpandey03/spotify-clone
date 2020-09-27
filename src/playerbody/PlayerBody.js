import React, { useEffect, useState } from 'react';
import './PlayerBody.css';
import Header from './Header';
import { useDataLayerValue } from '../datalayer/DataLayer';
import TimeIcon from '@material-ui/icons/Timer';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PlayIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';

function PlayerBody({ spotify }) {

    const [{ playlists, deviceId }, dispatch] = useDataLayerValue();
    const [playListTracks, setPlaylistTracks] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setPlaying] = useState(false);
    const [currentItemName, setCurrentItem] = useState(null);

    let trackId = null;

    if (playlists.items && playlists.items.length > 0) {
        trackId = playlists.items[0].id;

        if (!playListTracks) {
            spotify.getPlaylistTracks(trackId).then(playListTracks => {
                setPlaylistTracks(playListTracks);
            });
        }
    }

    // This useEffect method is to added with empty array 
    // to initialize audio. As array is empty it runs only once
    useEffect(() => {
        let _audio = new Audio();
        setAudio(_audio);
    }, []);

    // Pause current playing song
    const pauseSong = () => {
        if (audio && audio.src != null) {
            audio.src = null;
            audio.pause();
            setPlaying(false);
            dispatch({
                type: "SET_AUDIO",
                audio: audio,
            });
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        }
    }

    // Play current clicked song
    const playSong = (trackId) => {

        spotify.getTrack(trackId).then(res => {

            if (audio && audio.src != null) {
                audio.src = null;
                audio.pause();

                audio.src = res.preview_url;
                audio.play();
                setPlaying(true);
                setCurrentItem(trackId);

                dispatch({
                    type: "SET_CURRENT_ITEM",
                    item: res,
                });
                dispatch({
                    type: "SET_AUDIO",
                    audio: audio,
                });
                dispatch({
                    type: "SET_PLAYING",
                    playing: true,
                });
            }
        });
    }

    return (
        <div className='playerbody'>
            {
                playListTracks &&
                <div>
                    <Header spotify={spotify} />
                    <div className='playerbody__info'>
                        <img src={playlists?.items[0]?.images[0]?.url} alt='' />
                        <div className='playerbody__infoText'>
                            <strong>PLAYLIST</strong>
                            <h2>{playlists?.items[0]?.name}</h2>
                            <p>{playlists?.items[0]?.owner?.display_name}</p>
                            <button className='playerbody__playbutton'>Play</button>
                        </div>
                    </div>
                    <div className='playerbody__playlist'>
                        <Table size="small">
                            <TableHead>
                                <TableRow key='header'>
                                    <TableCell className='playerbody__playlist__headerData'></TableCell>
                                    <TableCell>TITLE</TableCell>
                                    <TableCell>ARTIST</TableCell>
                                    <TableCell>ALBUM</TableCell>
                                    <TableCell>{<CalendarIcon />}</TableCell>
                                    <TableCell>{<TimeIcon />}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        <Table>
                            <TableBody className='playerbody__playlist__tableBody'>
                                {
                                    playListTracks.items.map((row) => (

                                        <TableRow key={row.name} >
                                            <TableCell >
                                                <div className='playerbody__playlist__playIcon' >

                                                    { !isPlaying && <PlayIcon onClick={() => playSong(row.track.id)} />}

                                                    { isPlaying && (row.track.id != currentItemName) && <PlayIcon onClick={() => playSong(row.track.id)} />}
                                                    { isPlaying && (row.track.id === currentItemName) && <PauseIcon onClick={() => pauseSong()} />}
                                                </div>
                                            </TableCell>
                                            <TableCell className='playerbody__playlist__rowData'>{row.track.name}</TableCell>
                                            <TableCell className='playerbody__playlist__rowData'>{row.track.artists[0].name}</TableCell>
                                            <TableCell className='playerbody__playlist__rowData'>{row.track.album.name}</TableCell>
                                            <TableCell className='playerbody__playlist__rowcolor'>{row.added_at}</TableCell>
                                            <TableCell className='playerbody__playlist__rowcolor'>{parseFloat(row.track.duration_ms / 60000).toFixed(2)} min</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            }
        </div>
    );
}

export default PlayerBody;