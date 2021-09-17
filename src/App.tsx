import React, {useState} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import {LoginUserCredentials, RegistrationUserCredentials} from "./types";



export interface IAuthContext {
    loginFormValues:LoginUserCredentials| null,
    setLoginFormValues: (values: LoginUserCredentials)=> void | null;
    registrationFormValues: RegistrationUserCredentials | null,
    setRegistrationFormValues: (values: RegistrationUserCredentials)=> void | null;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
    
    const [loginFormValues, setLoginFormValues] = useState<LoginUserCredentials | null>(null)
    const [registrationFormValues, setRegistrationFormValues] = useState<RegistrationUserCredentials | null>(null)
    const [isAuthorized, setAutorized] = useState<boolean>(false);
    const [login, setLogin] = useState<string>('du92kippp2fgbf+werhd+@popcornfarm7.com')
    const [password, setPassword] = useState<string>('12334254')
    const AuthContextData = {loginFormValues, setLoginFormValues, registrationFormValues,
        setRegistrationFormValues,isAuthorized, setAutorized, login, setLogin, password, setPassword}
    
    
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





// if (error) {
//     console.log(error.graphQLErrors)
// }
// },[data,error])








// <div>
//     <div>
//         Vlues from context:
//     </div>
//     <div>
//         loginFormValues: {JSON.stringify(loginFormValues)}
//     </div>
//     <div>
//         registrationFormValues: {JSON.stringify(registrationFormValues)}
//     </div>
//     <br/>
//     <br/>
// </div>
