import classnames from 'classnames';
import React from 'react';
import style from './DropdownSet.module.scss';
import './DropdownSet.module.scss';

interface DropdownPropsSet {
    handleLogout: any;
}



const DropdownSet: React.FC<DropdownPropsSet> = ({handleLogout}) => {
    
    return (
        <ul className={style.nav}>
            <li>Profile</li>
            <li onClick={handleLogout}>Logout</li>
        </ul>
    )
}

export default DropdownSet;
