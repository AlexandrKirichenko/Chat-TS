import React, {useEffect, useState} from 'react'
import * as yup from 'yup'
import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import {AvatarInputProps} from '../../types'
import style from './AvatarInput.module.scss'

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     value,
                                                     name,
                                                     inputError,
                                                     touched, onBlur,
                                                     onChange,
                                                     nameAvatar,
                                                 }) => {
    
    const schema = yup.string().url().required()
    
    const [internalUrl, setInternalUrl] = useState<string>('')
    const [urlError, setUrlError] = useState<boolean>(false)
    
    
    const changeHandler = (e: any) => {
        setInternalUrl(e.target.value)
        if (internalUrl !== '') {
            const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
            const regex = new RegExp(expression)
            
            if (internalUrl && internalUrl.match(regex)) {
                setUrlError(false)
            } else {
                setUrlError(true)
            }
        }
        
    }
    
    console.log('urlError', urlError)
    
    useEffect(() => {
        
        const setter = async () => {
            try {
                await schema.validate(value)
                if (value) {
                    
                    setInternalUrl(value)
                    
                }
            } catch (e) {
                setInternalUrl('')
            }
        }
        setter()
    }, [value])
    
    return (
        <>
            <div className={style.wrapLabel}>logo</div>
            <div className={style.wrap}>
                <Avatar value={internalUrl ? internalUrl : ''} nameAvatar={nameAvatar}/>
                <div className={style.wrapInput}>
                    <Input
                        name={name}
                        value={internalUrl}
                        onChange={(e) => changeHandler(e)}
                        inputError={inputError}
                        onBlur={onBlur}
                        touched={touched}
                    />
                    {urlError && <div><h3>Not url</h3></div>}
                </div>
            </div>
        </>
    
    )
}

export default AvatarInput
