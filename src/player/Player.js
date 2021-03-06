import React from 'react';
import './Player.css';
import Sidebar from '../sidebar/Sidebar';
import PlayerBody from '../playerbody/PlayerBody';
import Footer from '../footer/Footer';

function Player({ spotify }) {
    return (
        <div className='player'>

            <div className='player__body'>
                <Sidebar />
                <PlayerBody spotify={spotify} />
            </div>
            <Footer spotify={spotify}/>
        </div>
    )
}

export default Player;