import React from 'react';
import style from './Header.module.scss';
import Avatar from '../Avatar ';
import './Header.module.scss';

// interface HeaderProps {
//     sizeAvatar?: string;
//     nameAvatar: string;
// }
//const Header: React.FC<> = ({sizeAvatar,nameAvatar}) => {
const Header: React.FC = () => {
    
    return (
        <>
            <div className={style.headerWrap}>
                {/*<Avatar sizeAvatar={sizeAvatar} nameAvatar={nameAvatar}/>*/}
            </div>
        </>
    )
}

export default Header;
