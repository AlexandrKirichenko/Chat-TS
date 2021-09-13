import React, {useEffect, useState} from "react";
import "./Input.module.scss";
import style from "./Input.module.scss";
import classnames from 'classnames';


interface InputProps {
    type: "email" | "text" | "password";
    value: string;
    id: string;
    name: string;
    size?: "small" | "large";
    errorMessage?: string;
    setInputValue?: (value: string) => void;
    autoComplete: "on" | "off";
    inputError: string;
    inputWasChanged?: boolean;
    onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({onChange,onBlur, type="email", size="large",inputError,inputWasChanged="false", value, id, name, setInputValue, errorMessage,autoComplete="off"}) => {
    
    const [internalValue, setInternalValue] = useState<string>(value);
    
    
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
                // className={classnames(style.input,{inputError} ? style[errorcolor]: null )}
                className={classnames(style.input, style[size])}
                value={value}
                name={name}
                placeholder={`Enter your ${name.toLowerCase()}`}
                onChange={onChange}
                autoComplete={autoComplete}
                onBlur={onBlur}
            />
            <div>
                {inputError && touched ? inputError: null}</div>}
            </div>
        </div>
    )
}

export default Input;