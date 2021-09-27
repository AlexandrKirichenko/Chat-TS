import {useQuery} from '@apollo/client'
import React, {useContext} from 'react'
import {AuthContext} from '../../App'
import {GET_ALL_MESSAGES} from '../../schemas'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

interface MessageItem {
    "id": string,
    "description": string,
    "userId": number,
    "convId": number,
    "date": string,
    "user": {
        "login": string,
        "email": string,
        "avatar": string
    }
}

const ChatBlock: React.FC = () => {
    const {data, loading} = useQuery(GET_ALL_MESSAGES, {pollInterval: 500});
    
    const messages: MessageItem[] = data ? data?.getAllMessages : null;
    
    const context = useContext(AuthContext);
    if (context === null) {
        return null;
    }

    const {user} = context;
    if (user === null) {
        return null;
    }
  
    
    return (
        <>
            {loading? <div>LOADING...</div>: null}
            <div className={styles.chatBlock}>
               
                {messages ? messages.map(msg => (
                        <>
                            {/*<div>{JSON.stringify(msg, null, 2)}</div>*/}
                            <Message
                                key={msg.id}
                                itsMe={msg.userId === Number(user?.id)}
                                description={msg.description}
                                login={msg.user.login}
                                userId={msg.userId}
                                avatar={msg.user.avatar}
                                id={msg.id}
                            />
                        </>
                    )
                ) : null}
            </div>
        </>
    )
    
}

export default ChatBlock;
