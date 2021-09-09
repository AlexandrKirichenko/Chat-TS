import React, {useEffect, useState} from "react";
import "./Input.module.scss";
import style from "./Input.module.scss";
import classnames from 'classnames';


interface InputProps {
    type: "email" | "text" | "password";
    value: string;
    id: string;
    name: string;
    errorMessage?: string;
    setInputValue?: (value: string) => void;
    autoComplete: "on" | "off";
    errorcolor ?: any;
}

const Input: React.FC<InputProps> = ({type="email",errorcolor, value, id, name, setInputValue, errorMessage,autoComplete="off"}) => {
   
    const [internalValue, setInternalValue] = useState<string>(value);
    
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalValue(value);
    }
    
    useEffect(()=>{
        if(setInputValue) {
            setInputValue(internalValue);
        }
        
    }, [internalValue]);
    return (
        <div className={style.wrap}>
            <label className={style.label} htmlFor={name}>
                {name}
            </label>
            <input
                type={type}
                id={id}
                className={classnames(style.input,{errorMessage} ? style[errorcolor]: null )}
                value={value}
                name={name}
                placeholder={`Enter your ${name.toLowerCase()}`}
                onChange={handleChangeValue}
                autoComplete={autoComplete}
            />
            {errorMessage ? <div className={style.errorMessage}>{errorMessage}</div>: null}
        </div>
    )
}

export default Input;
