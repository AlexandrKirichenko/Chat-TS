import React, {useCallback, useEffect, useState} from 'react'
import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import {AvatarInputProps} from '../../types'
import style from './AvatarInput.module.scss'
import * as yup from 'yup'
import debounce from 'lodash/debounce';


const DELAY = 1000;

const check = async (data: string) => {
    const schema = yup.string().url().required();
    try {
        await schema.validate(data);
        return true;
    } catch {
        return false;
    }
}

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     value,
                                                     name,
                                                     inputError,
                                                     touched, onBlur,
                                                     onChange,
                                                     nameAvatar,
                                                 }) => {
    
    
    const [internalUrl, setInternalUrl] = useState<string | null>(null);
    const [internalInputValue, setInternalInputValue] = useState(value);
    const DebounceSetInternalUrl = useCallback(debounce(setInternalUrl, DELAY), [])
    
    const handleChangeInternalInputValue = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const result = await check(value);
        
        setInternalInputValue(value);
        if (result && onChange) {
            DebounceSetInternalUrl(value);
            onChange(e);
        }
    }
    
    
    return (
        <>
            <div className={style.wrapLabel}>logo</div>
            <div className={style.wrap}>
                <Avatar value={internalUrl ? internalUrl : ''} nameAvatar={nameAvatar}/>
                <div className={style.wrapInput}>
                    <Input
                        name={name}
                        value={internalInputValue}
                        onChange={handleChangeInternalInputValue}
                        inputError={inputError}
                        onBlur={onBlur}
                        touched={touched}
                    />
                </div>
            </div>
        </>
    
    )
}

export default AvatarInput;
