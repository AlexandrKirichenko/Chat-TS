import './Avatar.module.scss';
import React, {useEffect, useState} from 'react';
import style from './Avatar.module.scss';
import classnames from 'classnames';
import {AvatarProps} from "../../types";

const DEFAULT_AVATAR = "https://www.tremplin-numerique.org/wp-content/uploads/2021/08/1629557521_Comment-changer-votre-photo-de-profil-Discord.png";

const Avatar: React.FC<AvatarProps> = ({value, nameAvatar, sizeAvatar = "",setMenu = null, userMenu}) => {
    
    const [isLoadError, setIsLoadError] = useState(false);
    
    const handleError = () => {
        
        setIsLoadError(true)
    }
    
    useEffect(()=>{
        
        setIsLoadError(false);
    }, [value]);
    
    return (
        <div className={style.wrap} onClick={() => setMenu && setMenu(!userMenu)}>
            {value &&
            <img className={classnames(style.avatar, style[sizeAvatar])} src={isLoadError ? DEFAULT_AVATAR : value}
                 onError={handleError}/>}
            {(value === "" && nameAvatar !== "") ? (
                    <div
                        className={classnames(style.avatar, style.text, style[sizeAvatar])}>{nameAvatar.substring(0, 1)}</div>
                ) :
                (value) ? null : (<div className={classnames(style.avatar, style.text, style[sizeAvatar])}>A</div>)
            }
        </div>
    )
}

export default Avatar;
