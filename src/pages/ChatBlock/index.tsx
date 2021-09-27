import {useQuery} from '@apollo/client'
import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../../App'
import {PATH_CHAT_BLOCK} from '../../config'
import {GET_ALL_MESSAGES} from '../../schemas'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

interface ChatBlockProp {
    id: string,
    description: string,
    userId: number,
    login: string;
    avatar?: string;
}

const ChatBlock: React.FC<ChatBlockProp> = () => {
    const {data} = useQuery(GET_ALL_MESSAGES, {pollInterval: 500});
    const context = useContext(AuthContext);
    
    useEffect(() => {
        if (data) {
        console.log(data)
        }
    }, [data]);
    return(
        <div className={styles.chatBlock}>
            {/*messages ? messages.map(msg=> <Message key={msg.id} itsMe={msg.user.id === user.id}  />*/}
            {/*): null*/}
        </div>
    )
    
}

export default ChatBlock;
