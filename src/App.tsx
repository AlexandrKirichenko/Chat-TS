import {useQuery} from '@apollo/client'
import React, {useEffect} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import {PATH_CHAT_BLOCK, PATH_LOGIN, PATH_REGISTRATION, PATH_TO_PROFILE,} from './config'
import ChatBlock from './pages/ChatBlock'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import {ME} from './schemas'
import {appActions, getIsAuthorized} from './store/appSlice'
import {useAppDispatch, useAppSelector} from './store/hooks'

function App() {
  const {data} = useQuery(ME)
  const history = useHistory()
  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector(getIsAuthorized)
  
  useEffect(() => {
    if (data) {
      dispatch(appActions.setIsAuthorized(true))
      dispatch(appActions.setUser(data.me.user))
      history.push(PATH_CHAT_BLOCK)
    }
  }, [data])
  
  return (
    <>
      <Header nameAvatar={''}/>
      <Layout>
        <Switch>
          <Route exact path={PATH_LOGIN}>
            <Login/>
          </Route>
          <Route path={PATH_REGISTRATION}>
            <Registration/>
          </Route>
          <Route path={PATH_CHAT_BLOCK}>
            {isAuthorized ? <ChatBlock/> : <div>You need to login</div>}
          </Route>
          <Route exact path={PATH_TO_PROFILE}>
            <Profile/>
          </Route>
        </Switch>
      </Layout>
    </>
  )
}

export default App
