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
                <div className={styles.messageForm}>
                    <textarea name="textarea"></textarea>
                    <Button type={'submit'} color={'primary'}
                            size={'large'}> Send Message</Button>
                </div>
            </div>
        </>
    )
    
}

export default ChatBlock;

// -------------------------------------------------------------------------
//     return (
//
//
//
//
//         <div className={styles.chatWrap}>
//             <div className={styles.sidebar}></div>
//             <div className={styles.chatBlock}>
//                 <Message {...messageProps}/>
//                 <div className={styles.messageForm}>
//                     <textarea name="textarea" >
//
//                     </textarea>
//                     <Button type={"submit"} color={"primary"}
//                             size={'large'}> Send Message</Button>
//                 </div>
//             </div>
//         </div>
//     )
//
// }
//
// export default ChatBlock;




