import React, {useEffect, useState} from 'react'
import Avatar from '../../components/Avatar '
import Input from '../../components/Input'
import {AvatarInputProps} from '../../types'
import style from './AvatarInput.module.scss'
import * as yup from 'yup'

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     value,
                                                     name,
                                                     inputError,
                                                     touched, onBlur,
                                                     onChange,
                                                     url,
                                                     nameAvatar,
                                                 }) => {
    
    const schema = yup.string().url().required();
    
    
    const [internalUrl, setInternalUrl] = useState<string | null>(null);
    
    useEffect(() => {
        const setter = async () => {
            try {
                await schema.validate(url);
                if (url) {
                    
                    setInternalUrl(url);
                }
            } catch (e) {
                setInternalUrl(null);
                
            }
        }
        setter();
    }, [url])
    
    return (
        <>
            <div className={style.wrapLabel}>logo</div>
            <div className={style.wrap}>
                <Avatar url={internalUrl ? internalUrl : ''} nameAvatar={nameAvatar}/>
                <div className={style.wrapInput}>
                    <Input
                        name={name}
                        value={value}
                        onChange={onChange}
                        inputError={inputError}
                        autoComplete={'off'}
                        onBlur={onBlur}
                        touched={touched}
                    />
                </div>
            </div>
        </>
    
    )
}

export default AvatarInput;
