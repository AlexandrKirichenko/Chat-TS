import classnames from 'classnames'
import React, {useContext} from 'react'
import {AuthContext} from '../../App'
import Avatar from '../Avatar'
import style from './Message.module.scss';
import './Message.module.scss';

interface MessageProp {
    id: string,
    description: string,
    userId: number,
    login: string;
    avatar?: string;
    itsMe: boolean;
}
const Message: React.FC<MessageProp> = ({itsMe}) => {
    const context = useContext(AuthContext);
    if (context === null) {
        return null;
    }
    const {user} = context;
    
    return (
        <div className={style.wrapMessage}>
            {user ? <Avatar value={user.avatar} nameAvatar={user.login} sizeAvatar={'small'} /> : null }
            <div className={classnames(style.messageBlock, {[style.notMe] : !itsMe})}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus eaque excepturi in ipsum, nihil nobis officiis optio quas, rerum sapiente tenetur totam vel veniam voluptas voluptatum. Laborum mollitia quam saepe?Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deserunt doloremque dolores eius expedita iste iure maiores minima mollitia nostrum, nulla obcaecati officiis quasi reiciendis sequi sit totam, velit veritatis.</div>
        </div>
    
    )
}

export default Message;
