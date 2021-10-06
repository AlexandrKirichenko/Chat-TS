import {useApolloClient, useMutation, useQuery, useSubscription,} from '@apollo/client'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {AuthContext} from '../../App'
import Button from '../../components/Button'
import Message from '../../components/Message'
import {GET_ALL_MESSAGES, MESSAGE_ADDED_SUB, CREATE_MESSAGE} from '../../schemas'
import styles from './ChatBlock.module.scss'
import {ReactComponent as TelegramImg} from '../../img/telegram.svg';
import {ReactComponent as Plus} from '../../img/plus.svg';
import {wsclientConect, wsclientReconect} from '../../client'

interface MessageItem {
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
    const {data: allMessages} = useQuery(GET_ALL_MESSAGES, {onCompleted:
            (allMessages) => {
        setMessages([...allMessages.getAllMessages])
    }} )
    const [addMessage ] = useMutation(CREATE_MESSAGE)
    const myRef = useRef<HTMLDivElement | null>(null)
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const client = useApolloClient();
    let sub: any;
    
    
    const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        // e.preventDefault();
        addMessage({variables: {description: message}})
        setMessage('');
    }
    //@ts-ignoge
        const handleUserKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
        };
 
    const context = useContext(AuthContext)
   
    useEffect(() => {
        console.log('ddddddddddddddddddddddddddddddddddddddddddddd')
        if (allMessages && !sub) {
            // let startMessagesList: MessageItem[] = allMessages.getAllMessages
            // setMessages([...startMessagesList]);
            const lastMessage = allMessages.getAllMessages[allMessages.getAllMessages.length - 1];
            sub = client
                .subscribe({
                    query: MESSAGE_ADDED_SUB,
                    variables: {
                        date: lastMessage.date
                    },
                    context: {'access-token': localStorage.getItem('token')},
                })
                .subscribe((newMessages) => {
                    const newMessagesFromSub: MessageItem[] = newMessages?.data?.messageAdded;
                    setMessages(prev => [...prev, ...newMessagesFromSub])
                })
            
        }
        return () => {
            if (sub) {
                sub.unsubscribe()
            }
        }
    }, [allMessages])

    
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollTop = myRef.current?.scrollHeight;
        }
    },);
   
    const messagesRender = useMemo(
        () =>
            messages ? messages.map((Messages) => (
                <div key={Messages.id}>
                    <div className={styles.sidebar}></div>
                    <Message key={Messages.id}
                                 itsMe={Messages.userId === Number(context?.user?.id)}
                                 messageText={Messages.description}
                                 login={Messages.user.login}
                                 userId={Messages.userId}
                                 avatar={Messages.user.avatar}
                                 id={Messages.id}
                        />
                    </div>
                )
            ) : null,
        [messages]);
    
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
                              <textarea onKeyDown={handleUserKeyPress} name="textarea" value={message} placeholder="Type your message" onChange={e => {
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


