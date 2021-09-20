import React from 'react';
import style from './ErrorMessage.module.scss';

interface IErrorMessage {
    error: string | undefined;
}

const ErrorMessage: React.FC<IErrorMessage> = ({error}) => {
    console.log('123213', error);
    return (<>
            <div className={style.errorMessage}> {error ? error : null}</div>
        </>
    )
}

export default ErrorMessage;
