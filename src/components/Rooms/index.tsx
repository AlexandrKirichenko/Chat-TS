import {useApolloClient,useQuery} from '@apollo/client'
import classnames from 'classnames'
import React, {useEffect, useMemo, useState} from 'react'
import styles from '../../pages/ChatBlock/ChatBlock.module.scss'
import {CONVERSATION_ADDED_SUB, GET_ALL_CONVERSATIONS, MESSAGE_ADDED_SUB} from '../../schemas'
import {InputProps} from '../../types'
import Message from '../Message'


interface RoomsItem {
  id: string;
  name: string;
  date: string;
  selectedRoomId: any;
  changeSelectedRoomId: (values: any) => void;
  current: any;
}



const Rooms:React.FC<RoomsItem> =( { current,selectedRoomId,changeSelectedRoomId }) => {
  const {data: allRooms} = useQuery(GET_ALL_CONVERSATIONS, {onCompleted:
      (allRooms) => {
        setRooms([...allRooms.getAllConversations])}
  });
  const [rooms, setRooms] = useState<RoomsItem[]>([]);
  const client = useApolloClient()
  let sub: any;
  
  {current ={rooms.id===selectedRoomId}}
  // const changeSelectedRoomId = () => {
  //   console.log('Clicked')
  // }
 
  
  useEffect(() => {
    console.log(rooms)
  },)
  
  console.log(555555555555555)
  console.log(allRooms);
  console.log('ROOMS',rooms)
  
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

  
  return (<div className={styles.rooms}>
    {
      rooms.map(rooms => <>
        <div key={rooms.id} className={classnames(styles.room,styles.current:[current] )}
             onClick={changeSelectedRoomId(rooms.id)}>{rooms.name}</div>
      </>
    }
  </div>)
}

export default Rooms;
