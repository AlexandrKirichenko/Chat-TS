import React from 'react';
import style from './DropdownSet.module.scss';
import './DropdownSet.module.scss';

interface DropdownPropsSet {
    handleLogout: () => void;
}

const DropdownSet: React.FC<DropdownPropsSet> = ({handleLogout}) => {
    
    return (
        <div className={style.nav}>
            <div className={style.list}>
                <div className={style.li}>Profile</div>
                <div className={style.separatorWrapper}>
                    <div>&nbsp;</div>
                </div>
                <div className={style.li} onClick={handleLogout}>Logout</div>
            </div>
            
        </div>
       
    )
}

export default DropdownSet;
