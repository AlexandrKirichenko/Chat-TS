import React, {useEffect, useState} from 'react'
import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import {AvatarInputProps} from '../../types'
import style from './AvatarInput.module.scss'
import * as yup from 'yup'

const DELAY = 5000;

const AvatarInput: React.FC<AvatarInputProps> = ({
                                                     value,
                                                     name,
                                                     inputError,
                                                     touched, onBlur,
                                                     onChange,
                                                     nameAvatar,
                                                 }) => {

    const schema = yup.string().url().required();

    const [internalUrl, setInternalUrl] = useState<string | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>();

    useEffect(() => {
        const setter = async () => {
            if (timerId) {
                clearTimeout(timerId);
            }
            try {
                await schema.validate(value);
                if (value) {
                    const timerId = setTimeout(()=>{setInternalUrl(value)}, DELAY)
                    setTimerId(timerId);
                }
            } catch (e) {
                setInternalUrl(null);
            }
        }
        setter();
    }, [value])

    return (
        <>
            <div className={style.wrapLabel}>logo</div>
            <div className={style.wrap}>
                <Avatar value={internalUrl ? internalUrl : ''} nameAvatar={nameAvatar}/>
                <div className={style.wrapInput}>
                    <Input
                        name={name}
                        value={value}
                        onChange={onChange}
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
