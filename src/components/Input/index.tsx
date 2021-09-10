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
    errorcolor?: any;
    inputError: string;
    inputWasChanged?: boolean;
}

const Input: React.FC<InputProps> = ({type="email",errorcolor,size="large",inputError,inputWasChanged="false", value, id, name, setInputValue, errorMessage,autoComplete="off"}) => {
   
    const [internalValue, setInternalValue] = useState<string>(value);
    
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalValue(value);
    }
    
    // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     switch (e.target.name) {
    //         case "name":
    //             setNameWasChanged(true)
    //         break
    //         case "password":
    //             setPasswordWasChanged(true)
    //             break
    //     }
    // }
    
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
                onChange={handleChangeValue}
                autoComplete={autoComplete}
                // onBlur={e => handleBlur}
            />
            {(inputWasChanged && inputError) && <div style={{color: 'orangered'}} className={style.errorMessage}>{errorMessage}</div>}
        </div>
    )
}

export default Input;
