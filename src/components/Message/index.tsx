import classnames from 'classnames'
import React from 'react'
import Avatar from '../Avatar'
import style from './Message.module.scss';
import './Message.module.scss';

export interface MessageProp {
    id: string,
    messageText: string,
    userId: number,
    login: string;
    avatar?: string;
    itsMe: boolean;
}

const Message: React.FC<MessageProp> = ({itsMe, avatar, login, messageText}) => {
    
    return (
        <div data-testid="message__block" className={classnames(style.wrapMessage, {[style.secondary]: itsMe})}>
            <Avatar value={avatar} nameAvatar={login} sizeAvatar={'small'}/>
            <div data-testid="message" className={classnames(style.messageBlock, {[style.secondary]: itsMe})}>
                {messageText}
            </div>
        </div>
    )
}

export default Message;

