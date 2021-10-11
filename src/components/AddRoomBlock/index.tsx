import React, {useState} from 'react'
import styles from '../../pages/ChatBlock/ChatBlock.module.scss'
import Button from '../Button'
import Input from '../Input'

export interface IAddRoomBlock {
  // value: string | null;
  // name: string;
  // inputError: string | undefined;
  // touched?: boolean;
  // onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddRoomBlock: React.FC = ({
                                       // name,
                                       // inputError,
                                       // touched,
                                       // onBlur,
                                       // onChange,
                                     }) => {
  // const [roomName, setRoomName] = useState<string>("");
  // const handleChangeInternalInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setRoomName(value);
  //   onChange && onChange(e);
  // }
  
  return (
    <div className={styles.wrapAddRoom}>
      {/*<Input*/}
      {/*  name={name}*/}
      {/*  value={roomName}*/}
      {/*  onChange={handleChangeInternalInputValue}*/}
      {/*  inputError={inputError}*/}
      {/*  onBlur={onBlur}*/}
      {/*  touched={touched}*/}
      {/*  placeholder="Name"*/}
      {/*/>*/}
      <Button type={"submit"} color={"primary"}  size={'small'}> {"Add"}</Button>
    </div>
  )
}

export default AddRoomBlock
