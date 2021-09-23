import {useQuery} from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import {PATH_CHAT_BLOCK, PATH_LOGIN, PATH_REGISTRATION} from './config'
import ChatBlock from './pages/ChatBlock'
import Login from './pages/Login'
import Registration from './pages/Registration'
import {ME} from './schemas'

interface User {
    login: string;
    email: string;
    avatar: string;
    id: string;
}

export interface IAuthContext {
    isAuthorized: boolean;
    setAutorized: (values: boolean) => void;
    user: User | null;
    setUser: (values: User | null) => void;
    modalActive: boolean;
    setModalActive: (values: boolean ) => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
    const [isAuthorized, setAutorized] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [modalActive, setModalActive] = useState<boolean> (false);
    const AuthContextData = {isAuthorized, setAutorized, user, setUser,modalActive, setModalActive};
    
    const {data} = useQuery(ME);
    const history = useHistory();
    
    useEffect(() => {
        if (data) {
            setAutorized(true);
            setUser(data.me.user);
            history.push(PATH_CHAT_BLOCK);
        }
    }, [data]);
    
    return (
        <>
            <AuthContext.Provider value={AuthContextData}>
                <Header nameAvatar={''}/>
                <Layout>
                    <Switch>
                        <Route exact path={PATH_LOGIN}>
                            <Login/>
                        </Route>
                        <Route path={PATH_REGISTRATION}><Registration/></Route>
                        <Route path={PATH_CHAT_BLOCK}>
                            {isAuthorized ? <ChatBlock />: <div>You need to login</div>}
                        </Route>
                    </Switch>
    
                </Layout>
            </AuthContext.Provider>
        </>
    );
}

export default App;
