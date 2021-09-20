import classnames from 'classnames';
import React from 'react';
import style from './Button.module.scss';
import './Button.module.scss';
import {gql} from "@apollo/client";

interface IErrorMessage {
    error: string;
}

const ErrorMessage: React.FC<IErrorMessage> = (error) => {
    
    return (
        <div className={style.errorMessage}> {error? error.graphQLErrors[0].message : null}</div>
    )
}

export default ErrorMessage;
