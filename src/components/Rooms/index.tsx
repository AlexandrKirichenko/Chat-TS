import {useApolloClient, useMutation, useQuery} from '@apollo/client'
import classnames from 'classnames'
import React, {useEffect, useState} from 'react'
import {ReactComponent as Plus} from '../../img/plus.svg'
import {CONVERSATION_ADDED_SUB, CREATE_CONVERSATION, GET_ALL_CONVERSATIONS} from '../../schemas'
import AddRoomBlockBlock from '../AddRoomBlock'
import Room from '../Room'
import styles from './Rooms.module.scss'


interface RoomsItem {
  id: number;
  name: string;
}

interface RoomProps {
  selectedRoomId: number | null;
  changeSelectedRoomId: (values: number | null) => void;
  setConvId: (values: number) => void;
  convId: number;
}


const Rooms: React.FC<RoomProps> = ({selectedRoomId, changeSelectedRoomId, setConvId, convId}) => {
  const {data: allRooms} = useQuery(GET_ALL_CONVERSATIONS, {
    onCompleted:
      (allRooms) => {
        
        setRooms([...allRooms.getAllConversations])
      }
  })
  const [AddRoom, {data}] = useMutation(CREATE_CONVERSATION)
  const [rooms, setRooms] = useState<RoomsItem[]>([])
  const [showAddChatForm, setShowAddChatForm] = useState<boolean>(false)
  const client = useApolloClient()
  let sub: any
  
  useEffect(() => {
    if (allRooms && !sub) {
      sub = client
        .subscribe({
          query: CONVERSATION_ADDED_SUB,
          context: {'access-token': localStorage.getItem('token')},
        })
        .subscribe((newRoom) => {
          const newRoomFromSub: any = newRoom?.data?.conversationAdded
          setRooms([...newRoomFromSub])
        })
    }
  }, [allRooms])
  
  const handleAddRoom = (chatRoomName: string) => {
    AddRoom({variables: {name: chatRoomName}})
    
  }
  
  const handlePlus = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowAddChatForm(!showAddChatForm)
  }
  
  const handleHideAddRoomForm = () => {
    setShowAddChatForm(false)
  }
  
  
  return (
    <>
      <div className={styles.rooms}>
        <div className={classnames(styles.control, {[styles.bordered]: !showAddChatForm})}>
          Rooms
          <button className={styles.plus} onClick={handlePlus}><Plus/></button>
        </div>
        <div className={classnames(styles.wrapperRoomsList, {[styles.hide]: showAddChatForm})}>
          {
            rooms.map(room => <Room key={room.id} onClick={() => {
                changeSelectedRoomId(room.id)
                setConvId(Number(room.id))
              }} isActive={room.id === selectedRoomId}>
                {room.name}
              </Room>
            )}
        </div>
        {showAddChatForm ? <AddRoomBlockBlock
          addRoom={handleAddRoom}
          currentChatList={allRooms ? allRooms.getAllConversations.map((item: { name: string }) => item.name) : []}
          onClose={handleHideAddRoomForm}
        /> : null}
      </div>
    </>
  )
}

export default Rooms
