import React from "react";
import "./Button.module.scss";
import s from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps {
    id: string;
    buttonName: string;
    color ?: string;
}

const Button:React.FC<ButtonProps> = ({id,buttonName, color=""}) => {
    return (
        <div className={s.wrap}>
          <button className={cn(s.button, s[color])}>{buttonName}</button>
        </div>
    )
}

export default Button;