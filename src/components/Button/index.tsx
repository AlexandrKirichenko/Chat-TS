import React from "react";
import "./Button.module.scss";
import style from "./Button.module.scss";
import classnames from 'classnames';

interface ButtonProps {
    color?: string;
    type: 'button' | 'submit';
    disabled?:boolean;
}

const Button:React.FC<ButtonProps> = ({color="primary", children,disabled,type="submit"}) => {
    return (
            <button disabled={disabled}  type={type} className={classnames(style.button, style[color], disabled ? style.disableButton : null)}>{children}</button>
    )
}

export default Button;
// disabled === true