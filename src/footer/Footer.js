import React, { useEffect, useState } from 'react';
import './Footer.css';
import { useDataLayerValue } from '../datalayer/DataLayer';
import PlayCircleOutlineOutlineIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import ShuffleOutlinedIcon from '@material-ui/icons/ShuffleOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import PlayIcon from '@material-ui/icons/PlaylistPlayOutlined';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import { Grid, Slider } from '@material-ui/core';
import { VolumeDown } from '@material-ui/icons';

function Footer({ spotify }) {

    const [{ playing, curentPlayingItem, audio }, dispatch] = useDataLayerValue();
    const [isPlaying, setPlaying] = useState(false);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(30);
    const [progressValue, setProgressValue] = useState(0);

    useEffect(() => {
        if (audio) {
            audio.addEventListener('timeupdate', (e) => {
                console.log(audio.currentTime);
                setMin(0);
                setMax(audio.duration);
                setProgressValue(audio.currentTime);
            }, false);
        }
    }, [audio]);

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

                dispatch({
                    type: "SET_CURRENT_ITEM",
                    item: res,
                });
                dispatch({
                    type: "SET_AUDIO",
                    audio: audio,
                });
            }
        });
    }

    return (
        <div>
            {
                curentPlayingItem &&
                <div className='footer'>
                    <div className='footer__left'>
                        <img className='footer__albumLogo'
                            src={curentPlayingItem.album.images[0].url} alt='' />
                        <div className='footer__songInfo'>
                            <h4>{curentPlayingItem.name}</h4>
                            <p>{curentPlayingItem.artists[0].name}</p>
                        </div>
                    </div>

                    <div className='footer__center'>
                        {!playing && <PlayIcon onClick={() => playSong(curentPlayingItem.track.id)} />}
                        {playing && <PauseIcon onClick={() => pauseSong()} />}
                    </div>

                    <div className='footer__right'>
                        <VolumeDown />
                        <p>{(progressValue/100).toFixed(2)}</p>
                        <Slider aria-labelledby="continuous-slider" step={1} min={min} max={max} value={progressValue} />
                        <p>{(max / 100).toFixed(2)}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default Footer;