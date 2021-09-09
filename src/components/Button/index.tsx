import React from "react";
import "./Button.module.scss";
import style from "./Button.module.scss";
import classnames from 'classnames';

interface ButtonProps {
    buttonName: string;
    color : string;
}

const Button:React.FC<ButtonProps> = ({color="primary", children}) => {
    return (
        <div className={style.wrap}>
            <button className={classnames(style.button, style[color])}>{children}</button>
        </div>
    )
}

export default Button;
