import React from 'react';
import './Input.module.scss';
import s from './Input.module.scss'

interface InputProps {
    type: 'email' | 'text';
    className: string;
    value: string;
    id: string;
    description: string;
}

const Input:React.FC<InputProps> = ({type, className, value, id,description}) => {
    return (
        <div className={s.wrap}>
            <div className={s.description}>{description}</div>
            <input
                type={type}
                id={id}
                className={s.className}
                value={value}
            />
        </div>
    
    )
}

export default Input;

