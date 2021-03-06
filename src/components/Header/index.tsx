import React, {useState, useRef} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {LS_TOKEN_KEY, PATH_CHAT_BLOCK, PATH_LOGIN} from '../../config'
import Avatar from '../Avatar'
import style from './Header.module.scss'
import Dropdown from './../Dropdown'
import useOutsideClick from './../hooks/useOutsideClick'
import DropdownSet from './../DropdownSet'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {appActions, getIsAuthorized, getUser} from "../../store/appSlice";

interface HeaderProps {
  sizeAvatar?: string;
  nameAvatar: string;
  showUserMenu?: boolean;
  setShowUserMenu?: (values: boolean) => void;
  handleLogout?: (values: string) => void;
}

const Header: React.FC<HeaderProps> = () => {
  const ref = useRef(null) as any;
  const [showUserMenu, setShowUserMenu] = useState(false);
  useOutsideClick(ref, () => setShowUserMenu(false))
  const history = useHistory();
  
  const isAuthorized = useAppSelector(getIsAuthorized);
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(appActions.setIsAuthorized(false));
    history.push(PATH_LOGIN);
    dispatch(appActions.setUser(null))
    localStorage.removeItem(LS_TOKEN_KEY);
  }
  
  const handleLogin = () => {
    history.push(PATH_LOGIN);
  }
  
  return (
    <>
      <div className={style.header}>
        <div className={style.headerWrapper}>
          <div className={style.headerText}>
            <Link to={PATH_CHAT_BLOCK}>GQL Chat</Link>
          </div>
          <div>
            {isAuthorized && user ?
              <div className={style.dropdownWrapper} ref={ref}>
                <Avatar value={user.avatar} nameAvatar={user.login} sizeAvatar={'small'} userMenu={showUserMenu} setMenu={setShowUserMenu}/>
                <Dropdown isShow={showUserMenu} handleLogout={handleLogout}>
                  <DropdownSet handleLogout={handleLogout }/>
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
