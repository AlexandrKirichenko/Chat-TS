import React from 'react'
import Avatar from '../../components/Avatar '
import Input from '../../components/Input'
import {AvatarProps, InputProps} from '../../types'
import style from "./AvatarInput.module.scss";

interface AvatarInputProps {
    inputProps: InputProps;
    avatarProps: AvatarProps;
}

const AvatarInput: React.FC<AvatarInputProps> = ({avatarProps, inputProps}) => {
    const {url,nameAvatar, sizeAvatar} = avatarProps
    return (
        <>
            <div className={style.wrapLabel}>logo</div>
            <div className={style.wrap}>
                <Avatar url={url} nameAvatar={nameAvatar} sizeAvatar={sizeAvatar}/>
                <div className={style.wrapInput}>
                    <Input {...inputProps} />
                </div>
            </div>
        </>
    
    )
}

export default AvatarInput;
