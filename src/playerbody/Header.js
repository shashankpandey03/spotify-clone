import { Avatar } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React from 'react';
import { useDataLayerValue } from '../datalayer/DataLayer';
import './Header.css';

function Header({ spotify }) {

    const [{ user }, dispatch] = useDataLayerValue();

    return (
        <div className='header'>
            <div className='header__left'>
                <Search />
                <input type='text' placeholder='Search for songs, artist etc...' />
            </div>
            <div className='header__right'>
                <Avatar alt='SP' src={user?.images[0]?.url} />
                <h4>{user?.display_name}</h4>
            </div>
        </div>
    )
}

export default Header;