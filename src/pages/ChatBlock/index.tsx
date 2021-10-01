import {useMutation, useQuery, useSubscription} from '@apollo/client'
import React, {useContext, useEffect, useRef, useState} from 'react'
import {AuthContext} from '../../App'
import Button from '../../components/Button'
import Message from '../../components/Message'
import {GET_ALL_MESSAGES, MESSAGE_ADDED_SUB, CREATE_MESSAGE} from '../../schemas'
import styles from './ChatBlock.module.scss'
import {ReactComponent as TelegramImg} from '../../img/telegram.svg';
import {ReactComponent as Plus} from '../../img/plus.svg';

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

const ChatBlock: React.FC = () => {
    const {data, subscribeToMore} = useQuery(GET_ALL_MESSAGES)
    const [addMessage] = useMutation(CREATE_MESSAGE)
    const myRef = useRef<HTMLDivElement | null>(null)
    const [message, setMessage] = useState('');
    const messages: MessageProp[] = data ? data?.getAllMessages : null
    const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addMessage({variables: {description: message}})
        setMessage('');
    }
    const context = useContext(AuthContext)
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollTop = myRef.current?.scrollHeight;
        }
    });
    
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollTop = myRef.current?.scrollHeight;
        }
        subscribeToMore({
            document: MESSAGE_ADDED_SUB, updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData) return prev
                const newMessage = subscriptionData.data.newMessage
                const updateMessageList = Object.assign({}, prev, {message: [...prev.message, newMessage]})
                return updateMessageList
            }
        })
    }, []);
    
    if (context === null) {
        return null
    }
    const {user, isAuthorized} = context
    if (user === null) {
        return null
    }
    const current = true
    return (isAuthorized ?
            <>
                <div className={styles.wrapper}>
                    <div className={styles.sidebar}>
                        <div className={styles.control}>
                            Rooms
                            <button className={styles.plus}><Plus/></button>
                        </div>
                        <div className={styles.rooms}>
                            <div className={`${styles.room} ${current && styles.current}`}>
                                General
                            </div>
                            <div className={styles.room}>
                                Room 1
                            </div>
                            <div className={styles.room}>
                                Room 2
                            </div>
                        </div>
                    </div>
                    <div className={styles.chatBlock}>
                        <div className={styles.messageList} ref={myRef}>
                            {messages ? messages.map(msg => (
                                    <div key={msg.id} >
                                        <div className={styles.sidebar}></div>
                                        <Message key={msg.id}
                                                 itsMe={msg.userId === Number(user?.id)}
                                                 messageText={msg.description}
                                                 login={msg.user.login}
                                                 userId={msg.userId}
                                                 avatar={msg.user.avatar}
                                                 id={msg.id}
                                        />
                                    
                                    </div>
                                )
                            ) : null}
                        </div>
                        <div className={styles.messageForm}>
                            <textarea name="textarea" value={message} placeholder="Type your message" onChange={e => {
                                setMessage(e.target.value)
                            }}></textarea>
                            <Button type={'submit'} color={'primary'}
                                    size={'mediumChat'} onClick={handleSubmit}
                            > <TelegramImg/> </Button>
                        </div>
                    
                    </div>
                
                </div>
            </> : <div> You should login </div>
    )
    
    
}

export default ChatBlock;



