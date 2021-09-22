import React, {useContext} from 'react';
import style from './Header.module.scss';
import {AuthContext} from "../../App";
import {Link, useHistory} from "react-router-dom";
import {LS_TOKEN_KEY, PATH_CHAT_BLOCK, PATH_LOGIN, PATH_REGISTRATION} from "../../config";
import Avatar from "../Avatar";

interface HeaderProps {
    sizeAvatar?: string;
    nameAvatar: string;
}

const Header: React.FC<HeaderProps> = ({sizeAvatar, nameAvatar}) => {
    const context = useContext(AuthContext);
    const history = useHistory();
    if (context === null) {
        return null;
    }
    
    const {user, setAutorized, isAuthorized, setUser} = context;
    
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
            {/*<div className={style.header}>*/}
            {/*    {user ?*/}
            {/*        <div>*/}
            {/*            <div>login: {user.login}</div>*/}
            {/*            <div>avatar: {user.avatar}</div>*/}
            {/*            <Avatar value={user.avatar} nameAvatar={'123'} sizeAvatar={''}/>*/}
            {/*            <div>email: {user.email}</div>*/}
            {/*        </div>*/}
            {/*        : null}*/}
            {/*    /!*<div>{JSON.stringify(user, null, 2)}</div>*!/*/}
            {/*    <div>*/}
            {/*        <Link to={PATH_CHAT_BLOCK}>ChatRoom</Link>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        {isAuthorized*/}
            {/*            ? <button onClick={handleLogout}>logOut</button>*/}
            {/*            : <button onClick={handleLogin}>login</button>}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Header;
