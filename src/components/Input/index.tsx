import React from "react";
import "./Input.module.scss";
import s from "./Input.module.scss";
import cn from "classnames";

interface InputProps {
    type: "email" | "text" | "password";
    size?: "large";
    value: string;
    id: string;
    name: string;
}

const Input:React.FC<InputProps> = ({type, size="",  value, id,name}) => {
    return (
        <div className={s.wrap}>
            <label className={s.label} htmlFor={name}>
                {name}
            </label>
            <input
                type={type}
                id={id}
                className={cn(s.input, s[size])}
                value={value}
                name={name}
                placeholder={`Enter your ${name.toLowerCase()}`}
                // onChange={handleChange}
            />
            {/*<div>Error</div>*/}
        </div>
    
    )
}

export default Input;

