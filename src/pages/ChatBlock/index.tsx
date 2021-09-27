import {useQuery} from '@apollo/client'
import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../../App'
import {PATH_CHAT_BLOCK} from '../../config'
import {GET_ALL_MESSAGES} from '../../schemas'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'


const ChatBlock: React.FC= () => {
    const {data} = useQuery(GET_ALL_MESSAGES, {pollInterval: 500});
    const context = useContext(AuthContext);
   
    return(
        <div className={styles.chatBlock}>
            response.data ? response.data.map(msg => <Message key={msg.id} itsMe={msg.user.id === user.id} />
            ): null
        </div>
    )
    
}

export default ChatBlock;
