import React from 'react';
import './SidebarOption.css';
import { useDataLayerValue } from '../datalayer/DataLayer';

function SidebarOption({ title, Icon, playlist }) {

    const [{}, dispatch] = useDataLayerValue();

    const handleClick = (playlist) => {
        dispatch({
            type: 'SELECTED_PLAYLIST',
            selectedPlayList : playlist,
        })
    }

    return (
        <div className='sidebarOption' onClick={() => handleClick(playlist)}>
            {Icon && <Icon className='sidebarOption__icon' />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOption;