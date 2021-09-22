import {useQuery} from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {Route, Switch, useHistory} from 'react-router-dom';
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import {PATH_CHAT_BLOCK, PATH_LOGIN, PATH_REGISTRATION} from "./config";
import Header from "./components/Header";
import {ME} from "./schemas";
// import chatBlock from "./pages/ChatBlock";

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
    const [user, setUser] = useState<User | null>(null)
    const AuthContextData = {isAuthorized, setAutorized, user, setUser}
    
    const {data} = useQuery(ME);
    
    useEffect(() => {
        if (data) {
            setAutorized(true);
            setUser(data.me.user);
            // history.push(PATH_CHAT_BLOCK);
        }
    }, [data]);
    
    return (
        <>
            <AuthContext.Provider value={AuthContextData}>
                <Layout>
                    <Header nameAvatar={''} />
                    <Switch>
                        <Route exact path={PATH_LOGIN}>
                            <Login/>
                        </Route>
                        <Route path={PATH_REGISTRATION}><Registration/></Route>
                        {/*<Route path={PATH_CHAT_BLOCK}>*/}
                        {/*    {isAuthorized ? <ChatBlock />: <div> Надо войти в систему</div>}*/}
                        {/*</Route>*/}
                    </Switch>
    
                </Layout>
            </AuthContext.Provider>
        </>
    );
}

export default App;
