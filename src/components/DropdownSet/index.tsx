import React from 'react';
import style from './DropdownSet.module.scss';
import './DropdownSet.module.scss';

interface DropdownPropsSet {
    handleLogout: () => void;
}

const DropdownSet: React.FC<DropdownPropsSet> = ({handleLogout}) => {
    
    return (
        <div className={style.nav}>
            <ul className={style.list}>
                <li>Profile</li>
                <li onClick={handleLogout}>Logout</li>
            </ul>
        </div>
       
    )
}

export default DropdownSet;
