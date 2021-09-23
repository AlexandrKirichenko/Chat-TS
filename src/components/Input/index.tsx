import classnames from 'classnames'
import React from 'react'
import style from './Input.module.scss'
import './Input.module.scss'
import {InputProps} from "../../types";

const Input: React.FC<InputProps> = ({
                                         touched,
                                         onChange,
                                         onBlur,
                                         type = 'text',
                                         inputError,
                                         value,
                                         id = '',
                                         name,
                                         autoComplete = 'off',
                                     }) => {
    return (
        <div className={style.wrap}>
            <label className={style.label} htmlFor={name}>{name}</label>
            <input
                type={type}
                id={id}
                className={classnames(style.input, (inputError && touched) ? style.borderError:null)}
                value={value}
                name={name}
                onChange={onChange}
                autoComplete={autoComplete}
                onBlur={onBlur}
            />
            <div className={style.errorMessage}>
                {inputError && touched ? inputError: null}
            </div>
        </div>
    )
}

export default Input;
