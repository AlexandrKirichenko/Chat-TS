import React, {useEffect, useRef, useState} from 'react'
import styles from './AddRoomBlock.module.scss'
import Button from '../Button'
import Input from "../Input";
import useOutsideClick from "../hooks/useOutsideClick";
import ErrorMessage from "../ErrorMessage"

export interface IAddRoomBlock {
  addRoom: (chatRoomName: string) => void;
  currentChatList: string[]
  onClose: () => void;
}

const AddRoomBlock: React.FC<IAddRoomBlock> = ({
                                                 addRoom, currentChatList, onClose
                                               }) => {
  
  const [newChatName, setNewChatName] = useState<string>('');
  const [error, setError] = useState<string>('')
  const handleChangeNewChatName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewChatName(value);
    
  }
  
  useEffect(() => {
    const check = currentChatList.filter(currentChat => currentChat.toLowerCase() === newChatName.toLowerCase()).length === 0;
    if (!check) {
      setError('Chat with this name already exists');
    } else (setError(''))
  }, [newChatName]);
  
  const handleAddNewChat = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (error === '') {
      const value = newChatName.trim();
      if (value.length > 0) {
        addRoom(value);
        setNewChatName('');
        onClose();
      }
    }
  }
  
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick(ref, () => onClose())
  
  return (
    <div className={styles.wrapAddRoom} ref={ref}>
      <form onSubmit={handleAddNewChat}>
          <div className={styles.wrapInput}>
            <Input value={newChatName} onChange={handleChangeNewChatName} name={'Input'} inputError={''} placeholder={"Name"}/>
          </div>
          <ErrorMessage error={error}/>
          <div className={styles.wrapButton}>
            <Button type={"submit"} color={"primary"} size={'small'} onClick={handleAddNewChat}>Add</Button>
          </div>
      </form>
    </div>
  )
}

export default AddRoomBlock
