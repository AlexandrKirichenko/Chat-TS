import {useApolloClient, useMutation, useQuery,} from '@apollo/client'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {AuthContext} from '../../App'
import Button from '../../components/Button'
import Message from '../../components/Message'
import {ReactComponent as Plus} from '../../img/plus.svg'
import {ReactComponent as TelegramImg} from '../../img/telegram.svg'
import {CREATE_MESSAGE, GET_ALL_MESSAGES, MESSAGE_ADDED_SUB} from '../../schemas'
import styles from './ChatBlock.module.scss'
import Rooms from '../../components/Rooms'

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
    const {data: allMessages} = useQuery(GET_ALL_MESSAGES, {
        onCompleted:
          (allMessages) => {
              setMessages([...allMessages.getAllMessages])
          }
    })
    const [addMessage] = useMutation(CREATE_MESSAGE)
    const myRef = useRef<HTMLDivElement | null>(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<MessageItem[]>([])
    const client = useApolloClient()
    let sub: any
    
    const sendMessage = (message: string) => {
        if (message.trim()) {
            addMessage({variables: {description: message}})
        }
        setMessage('')
        
    }
    
    const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault()
        sendMessage(message)
    }
    
    const handleKeyDownEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            sendMessage(message)
        }
    }
    
    const context = useContext(AuthContext)
    
    useEffect(() => {
        if (allMessages && !sub) {
            sub = client
              .subscribe({
                  query: MESSAGE_ADDED_SUB,
                  variables: {
                      date: (new Date(2080, 1, 1)).toString()
                  },
                  context: {'access-token': localStorage.getItem('token')},
              })
              .subscribe((newMessages) => {
                  const newMessagesFromSub: MessageItem[] = newMessages?.data?.messageAdded
                  setMessages(prev => [...prev, ...newMessagesFromSub])
              })
        }
    }, [allMessages])
    
    useEffect(() => {
        if (myRef.current) {
            myRef.current.scrollTop = myRef.current?.scrollHeight
        }
    },)
    
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
      [messages])
  
    const current = true
    
    return (
        <>
          <div className={styles.wrapper}>
            <div className={styles.sidebar}>
              <div className={styles.control}>
                Rooms
                <button className={styles.plus}><Plus/></button>
              </div>
              <Rooms current={current}/>
            </div>
            <div className={styles.control}>
              Rooms
              <button className={styles.plus}><Plus/></button>
            </div>
            <Rooms current={current}/>
              <div className={styles.messageForm}>
                            <textarea onKeyDown={handleKeyDownEnter} name="textarea" value={message}
                                      placeholder="Type your message" onChange={e => {
                              setMessage(e.target.value)
                            }}></textarea>
                <Button type={'submit'} color={'primary'}
                        size={'mediumChat'} onClick={handleSubmit}
                > <TelegramImg/> </Button>
              </div>
            </div>
        </>
    )
}

export default ChatBlock

