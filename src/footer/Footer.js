import React, { useEffect, useState } from 'react';
import './Footer.css';
import { useDataLayerValue } from '../datalayer/DataLayer';
import PlayIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import PauseIcon from '@material-ui/icons/PauseCircleFilled';
import { Slider } from '@material-ui/core';
import { VolumeDown } from '@material-ui/icons';

function Footer({ spotify }) {

    const [{ playing, curentPlayingItem, audio }, dispatch] = useDataLayerValue();
    const [isPlaying, setPlaying] = useState(true);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(30);
    const [progressValue, setProgressValue] = useState(0);

    //Register a listener to update song play progress in slider
    useEffect(() => {
        if (audio) {
            audio.addEventListener('timeupdate', (e) => {
                setMin(0);
                setMax(audio.duration);
                setProgressValue(audio.currentTime);
            }, false);
        }
    }, [audio]);

    const changeVolume = (event, value) => {
        if(audio) {
            // Divide volume by 100 as volume settings range between 0 and 1
            audio.volume = (value/100).toFixed(2);
        }
    }

    // Pause current playing song
    const pauseSong = () => {
        if (audio && audio.src != null) {
            audio.pause();
            setPlaying(false);
            dispatch({
                type: "SET_AUDIO",
                audio: audio,
            });
        }
    }

    // Play current clicked song
    const playSong = () => {

        if (audio && audio.src != null) {
            audio.play();
            setPlaying(true);

            dispatch({
                type: "SET_AUDIO",
                audio: audio,
            });
        }
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
                        {curentPlayingItem && !isPlaying && <PlayIcon fontSize="large" onClick={() => playSong()} />}
                        {curentPlayingItem && isPlaying && <PauseIcon fontSize="large" onClick={() => pauseSong()} />}
                    </div>

                    <div className='footer__right'>
                        <VolumeDown />
                        <Slider orientation="vertical" defaultValue={[30]}
                            aria-labelledby="volumeSlider" min={0} max={100} step={1}  scale={(x) => x ** 10}
                            onChange={ changeVolume }
                        />
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