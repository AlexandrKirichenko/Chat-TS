import React from "react";
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

const ChatBlock: React.FC = () => {
    return(
        
        <div className={styles.chatBlock}>
            <Message itsMe={true}/>
        </div>
    )
    
}

export default ChatBlock;
