import {useApolloClient, useMutation, useQuery} from '@apollo/client'
import classnames from 'classnames'
import React, {useEffect, useMemo, useState} from 'react'
import styles from './Rooms.module.scss'
import {CONVERSATION_ADDED_SUB, CREATE_CONVERSATION, GET_ALL_CONVERSATIONS, MESSAGE_ADDED_SUB} from '../../schemas'
import {InputProps} from '../../types'
import Message from '../Message'
import Room from '../Room'
import AddRoomBlockBlock from "../AddRoomBlock";
import {ReactComponent as Plus} from "../../img/plus.svg";
import useOutsideClick from "../hooks/useOutsideClick";


interface RoomsItem {
  id: number;
  name: string;
}

interface RoomProps {
  selectedRoomId: number | null;
  changeSelectedRoomId: (values: number | null) => void;
  setConvIdCb : (values: number) => void;
}


const Rooms: React.FC<RoomProps> = ({selectedRoomId, changeSelectedRoomId, setConvIdCb}) => {
  const {data: allRooms} = useQuery(GET_ALL_CONVERSATIONS, {
    onCompleted:
      (allRooms) => {
        setRooms([...allRooms.getAllConversations])
      }
  });
  const [AddRoom, {data}] = useMutation(CREATE_CONVERSATION);
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
          const newRoomFromSub: any = newRoom?.data?.conversationAdded
          setRooms(prev => [...prev, ...newRoomFromSub])
        })
    }
  }, [allRooms])
  console.log("ALL ROOMS",allRooms)
  
  const [showAddChatForm, setShowAddChatForm] = useState<boolean>(false)
  
  const handleAddRoom = (chatRoomName: string) => {
    AddRoom({ variables: { name: chatRoomName } })
    alert(chatRoomName);
  }
  
  const handlePlus = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowAddChatForm(true);
  }
  
  const handleHideAddRoomForm = () => {
    setShowAddChatForm(false);
  }
  
  
  return (
    <>
      <div className={styles.rooms}>
        <div className={styles.control}>
          Rooms
          <button className={styles.plus} onClick={handlePlus}><Plus/></button>
        </div>
        {
          rooms.map(room => <Room key={room.id} onClick={() => changeSelectedRoomId(room.id)}
                                  isActive={room.id === selectedRoomId}>
              {room.name}
            </Room>
          )}
        {showAddChatForm ? <AddRoomBlockBlock
          addRoom={handleAddRoom}
          currentChatList={allRooms ? allRooms.getAllConversations.map((item: { name: string }) => item.name) : []}
          onClose={handleHideAddRoomForm}
        /> : null}
      </div>
    </>
  )
}

export default Rooms;
