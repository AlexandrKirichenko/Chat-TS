import classnames from 'classnames';
import React from 'react';
import style from './Header.module.scss';
import Avatar from '../Avatar ';
import './Header.module.scss';

interface HeaderProps {
    sizeAvatar?: string;
    nameAvatar: string;
}

const Header: React.FC<HeaderProps> = ({sizeAvatar,nameAvatar}) => {
    
    return (
        <>
        <Avatar sizeAvatar={sizeAvatar} nameAvatar={nameAvatar}/>
        
        </>
    )
}

export default Header;
