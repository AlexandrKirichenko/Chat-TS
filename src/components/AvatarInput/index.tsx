import React from 'react'
import Avatar from '../../components/Avatar '
import Input from '../../components/Input'
import {AvatarProps, InputProps} from '../../types'
import style from "./AvatarInput.module.scss";

interface AvatarInputProps {
    inputProps: InputProps;
    avatarProps: AvatarProps;
    
    
}

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     avatarProps, inputProps
                                                 }) => {
    return (
        <>
            <Avatar {...avatarProps}/>
            <Input {...inputProps} />
        </>
    )
}

export default AvatarInput