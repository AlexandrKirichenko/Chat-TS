import {useQuery} from '@apollo/client'
import React, {useContext} from 'react'
import {AuthContext} from '../../App'
import Button from '../../components/Button'
import Message from '../../components/Message'
import {GET_ALL_MESSAGES} from '../../schemas'
import styles from './ChatBlock.module.scss'

interface MessageProp {
    id: string;
    description: string;
    userId: number;
    convId: number;
    date: string;
    user: {
        login: string;
        email: string;
        avatar: string;
    };
}

const getMessageProps = (msg: MessageProp, userId: number) => ({
    key: msg.id,
    itsMe: msg.userId === userId,
    messageText: msg.description,
    login: msg.user.login,
    userId: msg.userId,
    avatar: msg.user.avatar,
    id: msg.id,
})

const ChatBlock: React.FC = () => {
    const { data, loading } = useQuery(GET_ALL_MESSAGES);
    const messages: MessageProp[] = data ? data?.getAllMessages : null;
    const context = useContext(AuthContext);
    if (context === null) {
        return null;
    }
    const { user } = context;
    if (user === null) {
        return null;
    }
    
    return (
        <>
            <div className={styles.chatBlock}>
                <div className={styles.sidebar}>
                    <div>Rooms</div>
                    <div>General</div>
                    <div>Rooms 1</div>
                    <div>Rooms 2</div>
                </div>
                <div>
                    {messages ? messages.map(msg => (
                            <Message{...getMessageProps(msg, Number(user?.id))}/>
                        )
                    ) : null}
                </div>
                <div className={styles.messageForm}>
                    <textarea className={styles.textarea} name="textarea"></textarea>
                    <Button type={'submit'} color={'primary'}
                            size={'mediumChat'}> </Button>
                </div>
            </div>
        </>
    )
    
}

export default ChatBlock;




