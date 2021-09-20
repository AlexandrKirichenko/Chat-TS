import './Avatar.module.scss';
import React from 'react';
import style from './Avatar.module.scss';
import classnames from 'classnames';
import {AvatarProps} from "../../types";

const Avatar: React.FC<AvatarProps> = ({avatar, nameAvatar, sizeAvatar=""}) => {
    return(
        <div className={style.wrap}>
            {avatar && <img className={classnames(style.avatar, style[sizeAvatar])} alt="avatar" src={avatar}/>}
            {(avatar === "" && nameAvatar !== "") ? (
                <div className={classnames(style.avatar, style.text, style[sizeAvatar])}>{nameAvatar.substring(0,1)}</div>
            ) :
                (avatar) ? null: (<div className={classnames(style.avatar, style.text, style[sizeAvatar])}>A</div>)
            }
        </div>
    )
}

export default Avatar;

















