import React from 'react';
import './PlayerBody.css';
import Header from './Header';
import { useDataLayerValue } from '../datalayer/DataLayer';

function PlayerBody({spotify}) {

    const [{recommendation}, dispatch] = useDataLayerValue();

    return (
        <div className = 'playerbody'>
            <Header spotify={spotify}/>

            <div className='playerbody__info'>
                <img src='https://cdn.shortpixel.ai/client/q_lossy,ret_img,w_300/https://www.hypebot.com/wp-content/uploads/2020/07/discover-weekly-300x300.png' alt='' />
                <div className='playerbody__infoText'>
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>description...</p>
                </div>
            </div>
        </div>
    )
}

export default PlayerBody;