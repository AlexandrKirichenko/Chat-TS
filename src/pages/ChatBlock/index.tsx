import {useApolloClient, useLazyQuery, useMutation} from '@apollo/client'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import Button from '../../components/Button'
import Message from '../../components/Message'
import Rooms from '../../components/Rooms'
import {ReactComponent as TelegramImg} from '../../img/telegram.svg'
import {CREATE_MESSAGE, GET_ALL_MESSAGES, MESSAGE_ADDED_SUB} from '../../schemas'
import {getUser} from '../../store/appSlice'
import {useAppSelector} from '../../store/hooks'
import styles from './ChatBlock.module.scss'

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
  const [addMessage] = useMutation(CREATE_MESSAGE)
  const myRef = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [subMessages, setSubMessages] = useState<MessageItem[]>([])
  const client = useApolloClient()
  const [selectedRoomId, changeSelectedRoomId] = useState<number | null>(null)
  const user = useAppSelector(getUser)
  let sub: any
  
  const [doGetAllMessage] = useLazyQuery(GET_ALL_MESSAGES, {
    variables: {convId: selectedRoomId},
    fetchPolicy: 'network-only',
    onCompleted:
      (allMessages) => {
        setMessages([...allMessages.getAllMessages])
        sub?.unsubscribe()
        setSubMessages([])
        if (allMessages && !sub) {
          sub = client
            .subscribe({
              query: MESSAGE_ADDED_SUB,
              fetchPolicy: 'network-only',
              variables: {
                date: (new Date('2080-1-1')).toString(),
              },
              context: {'access-token': localStorage.getItem('token')},
            })
            .subscribe((newMessages) => {
              const newMessagesFromSub: MessageItem[] = newMessages?.data?.messageAdded.filter((mesage: MessageItem) => mesage.convId === selectedRoomId)
              if (newMessagesFromSub.length > 0) {
                setSubMessages(prev => {
                  const check = prev.filter(mesage => mesage.id === newMessagesFromSub[0].id).length === 0
                  return [...prev, ...check ? newMessagesFromSub : []]
                })
              }
              
            })
          
        }
      }
  })
  
  useEffect(() => {
    sub?.unsubscribe()
    doGetAllMessage()
  }, [selectedRoomId])
  
  const sendMessage = (message: string) => {
    if (message.trim()) {
      addMessage({variables: {description: message, selectedRoomId}})
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
  
  useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTop = myRef.current?.scrollHeight
    }
  },)
  
  const messagesRender = useMemo(
    () => {
      const mesages: MessageItem[] = [...messages, ...subMessages]
      return mesages ? mesages.map((Messages) => (
          <div key={Messages.id}>
            <div className={styles.sidebar}/>
            <Message key={Messages.id}
                     itsMe={Messages.userId == Number(user?.id)}
                     messageText={Messages.description}
                     login={Messages.user.login}
                     userId={Messages.userId}
                     avatar={Messages.user.avatar}
                     id={Messages.id}
            />
          </div>
        )
      ) : null
    },
    [messages, subMessages])
  
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <Rooms selectedRoomId={selectedRoomId} changeSelectedRoomId={changeSelectedRoomId}
          />
        </div>
        <div className={styles.chatBlock}>
          <div className={styles.messageList} ref={myRef}>
            {messagesRender}
          </div>
          <div className={styles.messageForm}>
                            <textarea onKeyDown={handleKeyDownEnter} name="textarea" value={message}
                                      placeholder="Type your message" onChange={e => {
                              setMessage(e.target.value)
                            }}/>
            <Button type={'submit'} color={'primary'}
                    size={'mediumChat'} onClick={handleSubmit}
            > <TelegramImg/> </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatBlock
