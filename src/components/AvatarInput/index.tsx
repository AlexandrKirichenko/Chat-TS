import React from 'react'
import Avatar from '../../components/Avatar '
import Input from '../../components/Input'
import {InputProps} from '../../types'
import style from "./AvatarInput.module.scss";

interface AvatarInputProps {
    sizeAvatar?: string;
    url?: string;
    nameAvatar: string;
    // inputProps: InputProps;
    type: "email" | "text" | "password";
    value: string;
    id: string;
    name: string;
    size?: "small" | "large";
    setInputValue?: (value: string) => void;
    autoComplete: "on" | "off";
    inputError: string | undefined;
    touched?: boolean;
    onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    
}

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     // inputProps
                                                     nameAvatar,
                                                     sizeAvatar = '',
                                                     touched,
                                                     type = 'email',
                                                     size = 'large',
                                                     inputError,
                                                     id,
                                                     name,
                                                     autoComplete = 'off',
                                                     url = ''
                                                 }) => {
    return (
        <>
            <Avatar url={url} nameAvatar={nameAvatar} sizeAvatar={sizeAvatar}/>
            <Input
                type={type}
                id={id}
                autoComplete={autoComplete}
                inputError={inputError}
                touched={touched}
                size={size}
                url={url}
            />
        </>
)
}
    
    export default AvatarInput