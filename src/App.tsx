import {useQuery} from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import { PATH_LOGIN, PATH_REGISTRATION} from './config'
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
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
    const [isAuthorized, setAutorized] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const AuthContextData = {isAuthorized, setAutorized, user, setUser};
    
    const {data} = useQuery(ME);
   
    
    useEffect(() => {
        if (data) {
            setAutorized(true);
            setUser(data.me.user);
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
                    </Switch>
                </Layout>
            </AuthContext.Provider>
        </>
    );
}

export default App;
