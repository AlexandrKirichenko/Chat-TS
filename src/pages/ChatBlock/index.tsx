import {useMutation, useQuery, useApolloClient} from '@apollo/client'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {appContext} from '../../AppContext'
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
    const {data: allOldMessages} = useQuery(GET_ALL_MESSAGES)
    const client = useApolloClient();
    let sub;
    //const {data: newMessageFromServer} =  useSubscription(MESSAGE_ADDED_SUB, { variables: {date: new Date().toString()}})
    const [addMessage] = useMutation(CREATE_MESSAGE)
    const myRef = useRef<HTMLDivElement | null>(null)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<MessageProp[]>([]);
    
    const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (message.trim().length > 0) {
            addMessage({variables: {description: message}})
            setMessage('');
        }
    }
    const context = useContext(appContext)
    
    useEffect(() => {
        if (allOldMessages) {
            setMessages([...allOldMessages.getAllMessages]);
            let last = ...;
            sub = client
                .subscribe(MESSAGE_ADDED_SUB, {variables: {date: last.date}})
                .subscribe((newMessages) => {
                    setMessages([...messages, ...newMessages]);
            })
        }
        
        return () => {
            if (sub) {
                sub.unsubscribe()
            }
        }
    }, [allOldMessages])
    
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollTop = myRef.current?.scrollHeight;
        }
    }, [messages]);
    
    // useEffect(() => {
    //     if (newMessageFromServer?.messageAdded) {
    //         setMessages(prev => [...prev, ...newMessageFromServer?.messageAdded])
    //     }
    // }, [newMessageFromServer])
    
    useEffect(() => {
        const messagesFromSubscribe = newMessageFromServer?.messageAdded as MessageProp[];
        if (messagesFromSubscribe) {
            const newMessages: MessageProp[] = [];
            messagesFromSubscribe.forEach(msgFromSubscribe => {
                // для того, чтобы некоторые сообщения не возвращались по несколько раз(чтоб убрать warnitng),пришлось писать проверку
               // Warning: Encountered two children with the same key, `1040`. Keys should be unique so that components maintain
               //  their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior
               //  is unsupported and could change in a future version.
                const check = messages.filter(msgFromCurrentMessagesList =>
                    msgFromCurrentMessagesList.id === msgFromSubscribe.id).length === 0;
                if (check) {
                    newMessages.push(msgFromSubscribe);
                }
            });
            setMessages(prev => [...prev, ...newMessages])
        }
    }, [newMessageFromServer])
    
    const messagesRender = useMemo(() => messages ? messages.map((msg, index) => (
            <div key={msg.id}>
                <div className={styles.sidebar}/>
                <div key={msg.id}>
                    <Message
                        itsMe={msg.userId === Number(context?.user?.id)}
                        messageText={msg.description}
                        login={msg.user.login}
                        userId={msg.userId}
                        avatar={msg.user.avatar}
                        id={msg.id}
                    />
                </div>
            </div>
        )
    ) : null, [messages]);
    
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
                            {messagesRender}
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



