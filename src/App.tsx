import React, {useState} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Button from './components/Button'
// import {AuthContext} from './context/context'

const INPUT_TEST_ERROR  = 'Error'

export interface IAuthContext {
    name:string;
    setName(value: string): void;
    password:string;
    setPassword(value: string): void;
    
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
    // const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const AuthContextData = { name, setName,password, setPassword};
    return (
        <>
            <AuthContext.Provider value={AuthContextData}>
                <Layout>
                    <Router>
                        <Switch>
                            <Route exact path="/"><Login/></Route>
                            <Route path="/registration"><Registration/></Route>
                        </Switch>
                        
                    </Router>
                  
                </Layout>
            </AuthContext.Provider >
        </>
    );
}

export default App;