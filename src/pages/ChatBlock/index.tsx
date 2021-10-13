import {useApolloClient, useMutation, useQuery,} from '@apollo/client'
import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import {AuthContext} from '../../App'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Message from '../../components/Message'
import {ReactComponent as Plus} from '../../img/plus.svg'
import {ReactComponent as TelegramImg} from '../../img/telegram.svg'
import {CREATE_CONVERSATION, CREATE_MESSAGE, GET_ALL_MESSAGES, MESSAGE_ADDED_SUB, REGISTER} from '../../schemas'
import styles from './ChatBlock.module.scss'
import Rooms from '../../components/Rooms'
import AddRoomBlockBlock from '../../components/AddRoomBlock'

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
  const [convId, setConvId] = useState<number> (84)
  console.log("CDDD",convId);
  const {data: allMessages} = useQuery(GET_ALL_MESSAGES, {
      variables: {convId: convId},
     onCompleted:
       (allMessages) => {
         setMessages([...allMessages.getAllMessages])
       }
    })

  console.log({variables: {convId: convId}})
 
  
  const [addMessage] = useMutation(CREATE_MESSAGE)
 
  const myRef = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState('')
 
  const [messages, setMessages] = useState<MessageItem[]>([])
  const client = useApolloClient()
  const [selectedRoomId, changeSelectedRoomId] = useState<number | null>(null)
  let sub: any
  
  // useEffect(() => {
  //   getAllMessages({variables: {convId: convId}});
  //   console.log("========in effect", convId)
  //   console.log("ALL MESSAGES",allMessages)
  // },[convId])
  
  
  // useEffect(() => {
  //   function getAllMessages(){
  //     setMessages([...allMessages.getAllMessages])
  //   }
  //   getAllMessages();
  // },[convId])
  
  // useEffect(() => {
  //   // const Mess = (allMessages: any) => {
  //   //   setMessages([...allMessages.getAllMessages])
  //   // }
  //
  // },)
  
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
            date: (new Date(2080, 1, 1)).toString(),
          },
          context: {'access-token': localStorage.getItem('token')},
        })
        .subscribe((newMessages) => {
        
          const newMessagesFromSub: MessageItem[] = newMessages?.data?.messageAdded
          
          setMessages(prev =>[...prev, ...newMessagesFromSub])
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
  
  if (context === null) {
    return null
  }
  
  const {user, isAuthorized} = context
  if (user === null) {
    return null
  }
  
  return (isAuthorized ?
      <>
        <div className={styles.wrapper}>
          <div className={styles.sidebar}>
            <Rooms selectedRoomId={selectedRoomId} changeSelectedRoomId={changeSelectedRoomId} setConvId={setConvId} convId={convId}/>
          </div>
          <div className={styles.chatBlock}>
            <div className={styles.messageList} ref={myRef}>
              {messagesRender}
            </div>
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
        </div>
      </> : <div> You should login </div>
  )
}

export default ChatBlock


