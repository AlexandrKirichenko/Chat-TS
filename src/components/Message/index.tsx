import {useSubscription} from '@apollo/client'
import classnames from 'classnames'
import React from 'react'
import {MESSAGE_ADDED_SUB} from '../../schemas'
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
// useSubscription(MESSAGE_ADDED_SUB, { variables: {date: new Date()}})
const Message: React.FC<MessageProp> = ({itsMe, avatar, login, messageText}) => {
 
    return (
        <div data-testid="message__block" className={classnames(style.wrapMessage, {[style.secondary]: !itsMe})}>
            <Avatar value={avatar} nameAvatar={login} sizeAvatar={'small'}/>
            <div className={style.messageBlock}>
                {messageText}
            </div>
        </div>
    )
}

export default Message;

