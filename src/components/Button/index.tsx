import React from "react";
import "./Button.module.scss";
import style from "./Button.module.scss";
import classnames from 'classnames';

interface ButtonProps {
    color?: string;
}

const Button:React.FC<ButtonProps> = ({color="primary", children}) => {
    return (
            <button className={classnames(style.button, style[color])}>{children}</button>
    )
}

export default Button;
