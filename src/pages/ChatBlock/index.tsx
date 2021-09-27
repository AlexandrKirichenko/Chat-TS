import {useQuery} from '@apollo/client'
import React, {useContext} from 'react'
import {AuthContext} from '../../App'
import {GET_ALL_MESSAGES} from '../../schemas'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

interface MessageItem {
  
    "user": {
        "login": string,
        "email": string,
        "avatar": string,
        "id": string
    }
}

const ChatBlock: React.FC<MessageItem> = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        return null;
    }
    const {user} = context;
    if (user === null) {
        return null;
    }
    
    const userFlag = (user.id)? true : false
    
    return (
        <>
            <div className={styles.chatBlock}>
                {user? (<Message
                    key={user.id}
                    itsMe={userFlag}
                    login={user.login}
                    avatar={user.avatar}
                />) : null}
            </div>
        </>
    )
    
}

export default ChatBlock;
