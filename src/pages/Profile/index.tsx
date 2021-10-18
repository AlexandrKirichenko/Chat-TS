import {useLazyQuery} from '@apollo/client'
import React, {useEffect} from 'react'
import {GET_MESSAGE_STATISTICS} from '../../schemas'
import './Profile.module.scss'

export interface UserCredentials {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const [getStat, {data}] = useLazyQuery(GET_MESSAGE_STATISTICS)
  
  useEffect(() => {
  })
  
  return <>Page</>
}

export default Login
