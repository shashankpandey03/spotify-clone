import React from 'react';
import './Footer.css';
import PlayCircleOutlineOutlineIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import SkipPreviousIcon from '@material-ui/icons/SkipPreviousOutlined';
import SkipNextOutlinedIcon from '@material-ui/icons/SkipNextOutlined';
import ShuffleOutlinedIcon from '@material-ui/icons/ShuffleOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import { Grid , Slider } from '@material-ui/core';
import { VolumeDown } from '@material-ui/icons';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer__left'>
                <img className='footer__albumLogo' 
                    src='https://upload.wikimedia.org/wikipedia/en/2/2e/Usher-yeah.jpg' alt=''/>
                <div className='footer__songInfo'>
                    <h4>Yeah</h4>
                    <p>Usher</p>
                </div>
            </div>

            <div className='footer__center'>
                <ShuffleOutlinedIcon className='footer__green' />
                <SkipPreviousIcon className='footer__icon' />
                <PlayCircleOutlineOutlineIcon fontSize='large' className='footer__icon' />
                <SkipNextOutlinedIcon className='footer__icon' />
                <RepeatOutlinedIcon className='footer__green' />
            </div>

            <div className='footer__right'>    
                <PlaylistPlayOutlinedIcon />
                <VolumeDown />
                <Slider />
            </div>
        </div>
    )
}

export default Footer;