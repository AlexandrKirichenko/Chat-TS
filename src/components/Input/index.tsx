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
    errorcolor?: any;
    nameError?: string;
    nameWasChanged: "true" | "false";
}

const Input: React.FC<InputProps> = ({type="email",errorcolor,nameError,nameWasChanged="false", value, id, name, setInputValue, errorMessage,autoComplete="off"}) => {
   
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
                className={classnames(style.input,{nameError} ? style[errorcolor]: null )}
                value={value}
                name={name}
                placeholder={`Enter your ${name.toLowerCase()}`}
                onChange={handleChangeValue}
                autoComplete={autoComplete}
            />
            {(nameWasChanged && nameError) && <div className={style.errorMessage}>{errorMessage}</div>}
        </div>
    )
}

export default Input;
