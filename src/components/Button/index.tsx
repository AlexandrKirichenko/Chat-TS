import React from "react";
import "./Button.module.scss";
import style from "./Button.module.scss";
import classnames from 'classnames';

interface ButtonProps {
    color?: string;
    type: 'button' | 'submit';
}

const Button:React.FC<ButtonProps> = ({color="primary", children,type="submit"}) => {
    return (
            <button type={type} className={classnames(style.button, style[color])}>{children}</button>
    )
}

export default Button;
