import React from 'react'
import styles from './ChatBlock.module.scss';
import Message from '../../components/Message'

const ChatBlock: React.FC = () => {
    
    const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg';
    const description= 'Lorem1 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
        'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
        'tempore vitae?'
    const description2='Lorem2 ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aperiam beatae consequatur ' +
        'cupiditate delectus dolore est id maxime mollitia necessitatibus nemo, neque optio quidem quis recusandae sint sunt ' +
        'tempore vitae?'
    const avatar2 ='https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552_square.jpg'
    
    return (
        <>
            <div className={styles.chatBlock}>
                <Message
                    key={1}
                    itsMe={false}
                    login={'login 1'}
                    avatar={avatar}
                    description={description}
                    userId={1}
                    id={'1'}
                />
                <Message
                    key={2}
                    itsMe={true}
                    login={'login 2'}
                    avatar={avatar2}
                    description={description2}
                    userId={2}
                    id={'2'}
                />
            </div>
        </>
    )
    
}

export default ChatBlock;
