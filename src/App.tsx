import {gql, useLazyQuery} from '@apollo/client'
import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'

const ME = gql`
    query {
        me {
            user{
                login
                email
                avatar
            }
            token
        }
    }
`;

interface User {
    login: string;
    email: string;
    avatar: string;
}

export interface IAuthContext {
    isAuthorized: boolean;
    setAutorized: (values: boolean) => void;
    user: User | null;
    setUser: (values: User | null) => void;
}

const TOKEN = localStorage.getItem('token');

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
    const [isAuthorized, setAutorized] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null)
    const AuthContextData = {isAuthorized, setAutorized, user, setUser}
    
    const [doUser, {data}] = useLazyQuery(ME);

    
    useEffect(() => {
        if (TOKEN) {
            doUser();
        }
    }, [])
    
    useEffect(() => {
        if (data) {
            setAutorized(true);
            setUser(data);
        }
    }, [data]);
    
    return (
        <>
            <AuthContext.Provider value={AuthContextData}>
                <Layout>
                    <Router>
                        <Switch>
                            {isAuthorized ? <Redirect from="/" to="/chatBlock" exact/> : null}
                            <Route exact path="/"><Login/></Route>
                            <Route path="/registration"><Registration/></Route>
                            <Route path="/chatBlock">
                                <div>chat</div>
                            </Route>
                        </Switch>
                    </Router>
                </Layout>
            </AuthContext.Provider>
        </>
    );
}

export default App;
