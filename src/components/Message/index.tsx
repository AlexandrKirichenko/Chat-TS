import classnames from 'classnames'
import React from 'react'
import Avatar from '../Avatar'
import style from './Message.module.scss';
import './Message.module.scss';
import {MessageProp} from "../../types";

const Message: React.FC<MessageProp> = ({itsMe, avatar, login, description}) => {
    
    return (
        <div data-testid="message__block" className={classnames(style.wrapMessage, {[style.secondary]: itsMe})}>
            <Avatar value={avatar} nameAvatar={login} sizeAvatar={'small'}/>
            <div data-testid="message" className={classnames(style.messageBlock, {[style.secondary]: itsMe})}>
                {description}
            </div>
        </div>
    )
}

export default Message;


