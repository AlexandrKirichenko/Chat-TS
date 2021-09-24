import classnames from 'classnames';
import React from 'react';
import style from './Dropdown.module.scss';
import './Dropdown.module.scss';

interface DropdownProps {
    children: React.ReactNode | React.FC;
    isShow: boolean;
    handleLogout: any;
}

const Dropdown: React.FC<DropdownProps> = ({children, handleLogout, isShow}) => {

    return (
        <div className={classnames(isShow ? style.wrap : style.wrap_active)}>{children}</div>
    )
}

export default Dropdown;
