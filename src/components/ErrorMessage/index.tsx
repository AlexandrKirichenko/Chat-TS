import classnames from 'classnames';
import React from 'react';
import style from './Button.module.scss';
import './Button.module.scss';

interface ButtonProps {
    error
}

const ErrorMessage: React.FC<ButtonProps> = ({error = 'primary', children, size="small", disabled, type = 'submit'}) => {
    
    return (
        <div className={style.errorMessage}> {error? error.graphQLErrors[0].message : null}</div>
    )
}

export default ErrorMessage;
