import {useQuery} from '@apollo/client'
import React, {useContext,useRef} from 'react'
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

const ChatBlock: React.FC = () => {
    const {data, loading} = useQuery(GET_ALL_MESSAGES)
    const messages: MessageProp[] = data ? data?.getAllMessages : null
    const context = useContext(AuthContext)
    // const refToButton = useRef<HTMLElement>(null)
    // const refToChat = useRef<HTMLElement>(null)

    
    if (context === null) {
        return null
    }
    const {user,isAuthorized} = context
    if (user === null) {
        return null
    }
    
    const current = true
    
    return (
        isAuthorized ?
        <>
            <div className={styles.wrapper} >
                <div className={styles.sidebar}>
                    <div className={styles.control}>
                        Rooms
                        <button className={styles.plus}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                <path
                                    d="M236.235 -50.5098L231.529 -50.5098L231.529 -44.8627L225.882 -44.8627L225.882 -40.1569L231.529 -40.1569L231.529 -34.5098L236.235 -34.5098L236.235 -40.1569L241.882 -40.1569L241.882 -44.8627L236.235 -44.8627L236.235 -50.5098Z"
                                    transform="translate(-225.88235473632812, 50.509803771972656)"/>
                            </svg>
                        </button>
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
                    {messages ? messages.map(msg => (
                            <>
                                <div className={styles.sidebar}></div>
                                
                                <Message key={msg.id}
                                         itsMe={msg.userId === Number(user?.id)}
                                         messageText={msg.description}
                                         login={msg.user.login}
                                         userId={msg.userId}
                                         avatar={msg.user.avatar}
                                         id={msg.id}
                                />
                            
                            </>
                        )
                    ) : null}
                        <div className={styles.messageForm} >
                            <textarea name="textarea" placeholder="Type your message"></textarea>
                            <Button type={'submit'} color={'primary'}
                                    size={'mediumChat'}> Send </Button>
                        </div>
                </div>
            </div>
        </> : <div> You should login </div>
    )
    
}

export default ChatBlock




