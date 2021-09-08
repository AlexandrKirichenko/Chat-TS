import React from "react";
import "./Input.module.scss";
import style from "./Input.module.scss";
import classnames from 'classnames';


interface InputProps {
    type: "email" | "text" | "password";
    size?: string;
    value: string;
    id: string;
    name: string;
    errorMsg?: string;
    
    setInputValueCb(value: string): void;
}

const Input: React.FC<InputProps> = ({type, size = "", value, id, name, setInputValueCb, errorMsg = null}) => {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValueCb(value);
    }
    
    return (
        <div className={style.wrap}>
            <label className={style.label} htmlFor={name}>
                {name}
            </label>
            <input
                type={type}
                id={id}
                className={classnames(style.input, style[size])}
                value={value}
                name={name}
                placeholder={`Enter your ${name.toLowerCase()}`}
                onChange={handleChangeValue}
                autoComplete="off"
            />
            {errorMsg ? <div className={style.errorMsg}>{errorMsg}</div>: null}
        </div>
    
    )
}

export default Input;
