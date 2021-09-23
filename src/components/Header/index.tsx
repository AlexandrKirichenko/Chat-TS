import React, {useContext, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {AuthContext} from '../../App'
import {LS_TOKEN_KEY, PATH_CHAT_BLOCK, PATH_LOGIN} from '../../config'
import Avatar from '../Avatar'
import style from './Header.module.scss'
import Dropdown from './../Dropdown'

interface HeaderProps {
    sizeAvatar?: string;
    nameAvatar: string;
    modalActive?: boolean;
    setModalActive?: (values: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({sizeAvatar, nameAvatar}) => {
    const context = useContext(AuthContext);
    const history = useHistory();
    if (context === null) {
        return null;
    }
   
    const {user, setAutorized, isAuthorized, setUser,modalActive, setModalActive} = context;
    
    const handleLogout = () => {
        setAutorized(false);
        history.push(PATH_LOGIN);
        setUser(null);
        localStorage.removeItem(LS_TOKEN_KEY);
    }
    
    const handleLogin = () => {
        history.push(PATH_LOGIN);
    }
    
    return (
        <>
            <div className={style.header}>
                <div className={style.headerWrapper}>
                    {/*{user ?*/}
                    {/*    <div>*/}
                    {/*        <div>login: {user.login}</div>*/}
                    {/*        <div>avatar: {user.avatar}</div>*/}
                    {/*        <Avatar value={user.avatar} nameAvatar={'123'} sizeAvatar={''}/>*/}
                    {/*        <div>email: {user.email}</div>*/}
                    {/*    </div>*/}
                    {/*    : null}*/}
                    {/*<div>{JSON.stringify(user, null, 2)}</div>*/}
                    {/*<div>*/}
                    {/*    <Link to={PATH_REGISTRATION}>registration</Link>*/}
                    
                    {/*</div>*/}
                    <div className={style.headerText}>
                        <Link to={PATH_CHAT_BLOCK}>GQL Chat</Link>
                    </div>
                    <div>
                        {isAuthorized && user ?
                            <div>
                                <Avatar value={user.avatar} nameAvatar={user.login} sizeAvatar={'small'} active={modalActive} setActive={setModalActive}/>
                                <Dropdown >
                                    <ul className={style.nav}>
                                        <li>Profile</li>
                                        <li onClick={handleLogout}>Logout</li>
                                    </ul>
                                </Dropdown >
                            </div>
                            
                            : <div className={style.login} onClick={handleLogin}>Login</div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;
