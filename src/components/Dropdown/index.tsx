import classnames from 'classnames';
import React from 'react';
import style from './Dropdown.module.scss';
import './Dropdown.module.scss';

interface DropdownProps {
    children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({children}) => {
    
    return (
        <div className={style.wrap}>{children}</div>
    )
}

export default Dropdown;
