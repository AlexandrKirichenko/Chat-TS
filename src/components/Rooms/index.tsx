import {useApolloClient, useQuery} from '@apollo/client'
import classnames from 'classnames'
import React, {useEffect, useMemo, useState} from 'react'
import styles from './Rooms.module.scss'
import {CONVERSATION_ADDED_SUB, GET_ALL_CONVERSATIONS, MESSAGE_ADDED_SUB} from '../../schemas'
import {InputProps} from '../../types'
import Message from '../Message'
import Room from '../Room'


interface RoomsItem {
  id: number;
  name: string;
}

interface RoomProps {
  selectedRoomId: number | null;
  changeSelectedRoomId: (values: number | null) => void;
}


const Rooms: React.FC<RoomProps> = ({selectedRoomId, changeSelectedRoomId}) => {
  const {data: allRooms} = useQuery(GET_ALL_CONVERSATIONS, {
    onCompleted:
      (allRooms) => {
        setRooms([...allRooms.getAllConversations])
      }
  });
  const [rooms, setRooms] = useState<RoomsItem[]>([]);
  const client = useApolloClient()
  let sub: any;
  
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
  
  
  return (
    <>
      <div className={styles.rooms}>
        {
          // rooms.map(rooms =>  <div key={rooms.id} className={classnames(styles.room,styles.current:[current] )} onClick={changeSelectedRoomId(rooms.id)}>{rooms.name}</div>
          rooms.map(room => <Room key={room.id} onClick={() => changeSelectedRoomId(room.id)}
                                  isActive={room.id === selectedRoomId}>
              {room.name}
            </Room>
          )}
      </div>
    </>
  )
}

export default Rooms;
