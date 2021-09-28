import React from 'react'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

const ChatBlock: React.FC = () => {
    
    const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg';
    const messageText= 'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
        'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
        'tempore vitae?'
    const messageText2='Lorem2 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
        'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
        'tempore vitae?'
    const avatar2 ='https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552_square.jpg'
    
    const messageProps1 = {
        key: 1,
        itsMe: false,
        login: 'login 1',
        avatar: avatar,
        messageText: messageText,
        userId: 1,
        id:'1'
    }
    const messageProps2 = {
        key: 2,
        itsMe: true,
        login: 'login 1',
        avatar: avatar2,
        messageText: messageText2,
        userId: 2,
        id:'2'
    }
    
    return (
        <div className={styles.chatWrap}>
            <div className={styles.sidebar}>
            
            </div>
            <div className={styles.chatBlock}>
               
                <Message {...messageProps1}
                />
                <Message {...messageProps2}/>
            </div>
        </div>
    )
    
}

export default ChatBlock;
