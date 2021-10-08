import React, {ReactElement} from 'react'
import classnames from 'classnames'
import styles from 'Room.module.scss'

interface IRoomItem {
  isActive: boolean;
  children: string;
  onClick(e: any): void;
}

const Room:React.FC<IRoomItem> =( { onClick,isActive,children }) => {
  return (
    <div className={classnames(styles.room,{[styles.current]: isActive})} onClick={onClick}>{children}</div>
  )
}

export default Room
