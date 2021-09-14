import React from 'react'
import Avatar from '../../components/Avatar '
import Input from '../../components/Input'
import {InputProps} from '../../types'
import style from "./AvatarInput.module.scss;

interface AvatarInputProps {
    color?: string;
    type: 'button' | 'submit';
    disabled?: boolean;
    inputProps: InputProps;
}

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     name,
                                                     sizeAvatar = '',
                                                     touched,
                                                     onChange,
                                                     onBlur,
                                                     type = 'email',
                                                     size = 'large',
                                                     inputError,
                                                     value,
                                                     id,
                                                     name,
                                                     setInputValue,
                                                     autoComplete = 'off',
                                                     url = ''
                                                 }) => {
    return (
        <Avatar img={''} name={'Alex'} size={'large'}/>
    <Input
        type={'text'}
        id={'form-url-input'}
        autoComplete={'off'}
        inputError={inputError}
        touched={touched}
        size={'small'}
        url={formik.getFieldProps('url')}
    />
)
}
    
    export default AvatarInput