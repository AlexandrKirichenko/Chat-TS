import {gql} from '@apollo/client'

export const SIGIN = gql`
    query signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
            user {
                email
                id
                avatar
                login
            }
        }
    }
`;

export const REGISTER = gql`
    mutation registration(
        $avatar: String!
        $email: String!
        $password: String!
        $login: String!
    ) {
        registration(
            avatar: $avatar,
            email: $email,
            password: $password,
            login: $login,
        )
        {
            token
            user {
                login
                email
                id
                avatar
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            user{
                login
                email
                avatar
                id
            }
            token
        }
    }
`;

export const GET_ALL_MESSAGES = gql`
    query getAllMessages($convId:Int) {
      getAllMessages(convId:$convId)
             {
                id
                description
                userId
                date
                user{
                    login
                    avatar
                }
            }
        }
`;

export const MESSAGE_ADDED_SUB = gql`
    subscription messageAdded($date: DateTime!) {
        messageAdded(date:$date)  {
            id
            description
            userId
            convId
            date
            user {
                id
                login
                email
                avatar
            }
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation createMessage($description:String!,$convId:Int)
    { createMessage(description:$description,convId:$convId){
        id
        description
        userId
        convId
        date
        user {
            login
            email
            avatar
        }
    }
    }
`;

export const GET_ALL_CONVERSATIONS = gql`
  query getAllConversations {
  getAllConversations {
    id
    createdBy
    name
    date
  }
}
`;

export const CREATE_CONVERSATION = gql`
  mutation createConversation(
    $name:String!) {
    createConversation(name:$name) {
      id
      createdBy
      name
      date
    }
  }
`;

export const CONVERSATION_ADDED_SUB = gql`
    subscription conversationAdded {
        conversationAdded
        {
            id
            createdBy
            name
            date
        }
    }
`;


//
// import {useApolloClient, useLazyQuery, useMutation} from '@apollo/client'
// import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
// import {AuthContext} from '../../App'
// import Button from '../../components/Button'
// import Message from '../../components/Message'
// import {ReactComponent as TelegramImg} from '../../img/telegram.svg'
// import {CREATE_MESSAGE, GET_ALL_MESSAGES, MESSAGE_ADDED_SUB} from '../../schemas'
// import styles from './ChatBlock.module.scss'
// import Rooms from '../../components/Rooms'
//
// interface MessageItem {
//   id: string;
//   description: string;
//   userId: number;
//   convId: number;
//   date: string;
//   user: {
//     login: string;
//     email: string;
//     avatar: string;
//   };
// }
//
//
//
// const ChatBlock: React.FC = () => {
//   const [convId, setConvId] = useState<number>(0)
//   const [addMessage] = useMutation(CREATE_MESSAGE)
//
//   const myRef = useRef<HTMLDivElement | null>(null)
//   const [message, setMessage] = useState('')
//
//   const [messages, setMessages] = useState<MessageItem[]>([])
//   const [subMessages, setSubMessages] = useState<MessageItem[]>([])
//   const client = useApolloClient()
//   const [selectedRoomId, changeSelectedRoomId] = useState<number | null>(null)
//
//   let sub: any
//
//   const [newSub, setNewSub] = useState<boolean>(false);
//
//   const [doGetAllMessage, {data: allMessages, loading: allMessagesLoading}] = useLazyQuery(GET_ALL_MESSAGES, {
//     variables: {convId: convId},
//     fetchPolicy: 'network-only',
//     onCompleted:
//       (allMessages) => {
//         setMessages([...allMessages.getAllMessages])
//       }
//   })
//
//
//   useEffect(() => {
//     sub?.unsubscribe();
//     setMessages([]);
//     doGetAllMessage();
//   }, [convId]);
//
//   useEffect(() => {
//     if (allMessages) {
//       sub?.unsubscribe();
//       setMessages([...allMessages.getAllMessages]);
//       setNewSub(true);
//     }
//   }, [allMessages])
//
//   useEffect(() => {
//     if (newSub) {
//       sub?.unsubscribe();
//       setNewSub(false);
//       setSubMessages([]);
//       if (allMessages && !sub) {
//         sub = client
//           .subscribe({
//             query: MESSAGE_ADDED_SUB,
//             fetchPolicy: "network-only",
//             variables: {
//               date: (new Date(2080, 1, 1)).toString(),
//             },
//             context: {'access-token': localStorage.getItem('token')},
//           })
//           .subscribe((newMessages) => {
//             const newMessagesFromSub: MessageItem[] = newMessages?.data?.messageAdded.filter((msg: any) => msg.convId === convId)
//             if (newMessagesFromSub.length > 0) {
//               setSubMessages(prev => {
//                 const check = prev.filter(msg => msg.id === newMessagesFromSub[0].id).length === 0;
//                 return [...prev, ...check? newMessagesFromSub: []]
//               });
//             }
//
//           })
//
//       }
//     }
//   }, [newSub])
//
//
//   const sendMessage = (message: string) => {
//     if (message.trim()) {
//       addMessage({variables: {description: message, convId}})
//     }
//     setMessage('')
//   }
//
//
//   const handleSubmit = (e: React.SyntheticEvent<HTMLButtonElement>) => {
//     e.preventDefault()
//     sendMessage(message)
//   }
//
//   const handleKeyDownEnter = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       sendMessage(message)
//     }
//   }
//
//   const context = useContext(AuthContext)
//
//
//   useEffect(() => {
//     if (myRef.current) {
//       myRef.current.scrollTop = myRef.current?.scrollHeight
//     }
//   },)
//
//
//   const messagesRender = useMemo(
//     () => {
//       const msgs: MessageItem[] = [...messages,...subMessages]
//       return msgs ? msgs.map((Messages) => (
//           <div key={Messages.id}>
//             <div className={styles.sidebar}/>
//             <Message key={Messages.id}
//                      itsMe={Messages.userId === Number(context?.user?.id)}
//                      messageText={Messages.description}
//                      login={Messages.user.login}
//                      userId={Messages.userId}
//                      avatar={Messages.user.avatar}
//                      id={Messages.id}
//             />
//           </div>
//         )
//       ) : null
//     },
//     [messages, subMessages])
//
//   if (context === null) {
//     return null
//   }
//
//   const {user, isAuthorized} = context
//   if (user === null) {
//     return null
//   }
//
//   return (isAuthorized ?
//       <>
//         <div className={styles.wrapper}>
//           <div className={styles.sidebar}>
//             <Rooms selectedRoomId={selectedRoomId} changeSelectedRoomId={changeSelectedRoomId} setConvId={setConvId}
//                    convId={convId}/>
//           </div>
//           <div className={styles.chatBlock}>
//             <div className={styles.messageList} ref={myRef}>
//               {messagesRender}
//             </div>
//             <div className={styles.messageForm}>
//                             <textarea onKeyDown={handleKeyDownEnter} name="textarea" value={message}
//                                       placeholder="Type your message" onChange={e => {
//                               setMessage(e.target.value)
//                             }} />
//               <Button type={'submit'} color={'primary'}
//                       size={'mediumChat'} onClick={handleSubmit}
//               > <TelegramImg/> </Button>
//             </div>
//           </div>
//         </div>
//       </> : <div> You should login </div>
//   )
// }
//
// export default ChatBlock



