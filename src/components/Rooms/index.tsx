import {useApolloClient,useQuery} from '@apollo/client'
import React, {useEffect, useMemo, useState} from 'react'
import styles from '../../pages/ChatBlock/ChatBlock.module.scss'
import {CONVERSATION_ADDED_SUB, GET_ALL_CONVERSATIONS, MESSAGE_ADDED_SUB} from '../../schemas'
import {InputProps} from '../../types'
import Message from '../Message'


interface RoomsItem {
  id: string;
  createdBy: number;
  name: string;
  date: string;
}

const Rooms:React.FC<any> =( { current }) => {
  const {data: allRooms} = useQuery(GET_ALL_CONVERSATIONS, {onCompleted:
      (allRooms) => {
        setRooms([...allRooms.getAllConversations])}
  });
  const [rooms, setRooms] = useState<RoomsItem[]>([]);
  const client = useApolloClient()
  let sub: any;
  
  
  
  console.log(allRooms);
  
  useEffect(() => {
    console.log('subscr1')
    if (allRooms && !sub) {
      sub = client
        .subscribe({
          query: CONVERSATION_ADDED_SUB,
          context: {'access-token': localStorage.getItem('token')},
        })
        .subscribe((newRoom) => {
          // const newRoomFromSub = newRoom?.data?.
          // setRooms(prev => [...prev, ...newRoomFromSub])
          console.log('subscr')
        })
    }
  }, [allRooms])
  // const messagesRender = useMemo(
  //   () =>
  //     rooms ? rooms.map((rooms) => (
  //       <div className={styles.room}>
  //         {rooms}
  //       </div>
  //       )
  //     ) : null,
  //   [rooms])
  
  return <div className={styles.rooms}>
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
}

export default Rooms;
