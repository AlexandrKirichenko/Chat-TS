import React from 'react';
import './Button.module.scss';
import s from './Button.module.scss';

interface ButtonProps {
    className: string;
    id: string;
    buttonName: string;
}

const Button:React.FC<ButtonProps> = ({className, id,buttonName}) => {
    return (
        <div className={s.wrap}>
          <button className={s.button}>{buttonName}</button>
        </div>
    
    )
}

export default Button;