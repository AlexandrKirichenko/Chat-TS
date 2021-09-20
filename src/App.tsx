import React, {useState} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import {LoginUserCredentials, RegistrationUserCredentials} from "./types";

interface User  {
    login: string;
    email: string;
    avatar: string;
}

export interface IAuthContext {
    isAuthorized: boolean;
    setAutorized: (values: boolean) => void ;
    user: User;
    setUser: (values: string) => void;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);
function App() {
    const [isAuthorized, setAutorized] = useState<boolean>(false);
    const [user, setUser] = useState<string>('')
    const AuthContextData = {isAuthorized, setAutorized, user, setUser}
    
    return (
        <>
            <AuthContext.Provider value={AuthContextData}>
                <Layout>
                    <Router>
                        <Switch>
                            <Route exact path="/"><Login/></Route>
                            <Route path="/registration"><Registration/></Route>
                            <Route path="/chatBlock"><div>chat</div></Route>
                        </Switch>
                    </Router>
                </Layout>
            </AuthContext.Provider >
        </>
    );
}

export default App;





