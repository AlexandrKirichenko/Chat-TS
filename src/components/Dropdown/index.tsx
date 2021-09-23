import classnames from 'classnames';
import React from 'react';
import style from './Dropdown.module.scss';
import './Dropdown.module.scss';

interface DropdownProps {
    children: React.ReactNode;
    isShow: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({children, isShow}) => {
    
    return (
        <div className={style.wrap}>{children}</div>
    )
}

export default Dropdown;
