import React from 'react'
import styles from '../../pages/ChatBlock/ChatBlock.module.scss'
import {InputProps} from '../../types'

interface RoomsProps {
  current: boolean;
}

const Rooms:React.FC<RoomsProps> =( { current }) => {
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
