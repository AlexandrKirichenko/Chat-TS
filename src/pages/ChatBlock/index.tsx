import React from 'react'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

const ChatBlock: React.FC = () => {
    
    const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg';
    const messageText= 'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
        'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
        'tempore vitae?'
    
    const messageProps = {
        key: 1,
        itsMe: false,
        login: 'login 1',
        avatar: avatar,
        messageText: messageText,
        userId: 1,
        id:'1'
    }
    
    return (
        <div className={styles.chatWrap}>
            <div className={styles.sidebar}>
            
            </div>
            <div className={styles.chatBlock}>
               
                <Message {...messageProps}/>
            </div>
        </div>
    )
    
}

export default ChatBlock;
