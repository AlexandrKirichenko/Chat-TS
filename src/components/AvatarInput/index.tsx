import React from 'react'
import Avatar from '../../components/Avatar '
import Input from '../../components/Input'
import {AvatarInputProps} from '../../types'
import style from './AvatarInput.module.scss'

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     type,
                                                     value,
                                                     id,
                                                     name,
                                                     size,
                                                     setInputValue,
                                                     autoComplete,
                                                     inputError,
                                                     touched, onBlur,
                                                     onChange,
                                                     url,
                                                     nameAvatar,
                                                 }) => {

    return (
        <>
            <div className={style.wrapLabel}>logo</div>
            <div className={style.wrap}>
                <Avatar url={url} nameAvatar={nameAvatar}/>
                <div className={style.wrapInput}>
                    <Input type={type}
                           id={id}
                           name={name}
                           value={value}
                           setInputValue={setInputValue}
                           size={size}/>
                           onChange={onChange}
                           inputError={inputError}
                           autoComplete={autoComplete}
                           onBlur={onBlur}
                           touched={touched}
                </div>
            </div>
        </>
    
    )
}

export default AvatarInput;
