import React, {useContext} from 'react'
import {AuthContext} from '../../App'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

const ChatBlock: React.FC = () => {
    const context = useContext(AuthContext);
    
    return(
        
        <div className={styles.chatBlock}>
            <Message itsMe={true}/>
        </div>
    )
    
}

export default ChatBlock;
