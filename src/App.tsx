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
    
    const [loginFormValues, setLoginFormValues] = useState<LoginUserCredentials | null>({login: '',
        password: '',
    })
    const [registrationFormValues, setRegistrationFormValues] = useState<RegistrationUserCredentials | null>({login: '',
        password: '',
        repeatPassword: '',
        email: ''})
    
    const AuthContextData = {loginFormValues, setLoginFormValues, registrationFormValues, setRegistrationFormValues}
    
    return (
        <>
            <div>
                <div>
                    Vlues from context:
                </div>
                <div>
                    loginFormValues: {JSON.stringify(loginFormValues)}
                </div>
                <div>
                    registrationFormValues: {JSON.stringify(registrationFormValues)}
                </div>
                <br/>
                <br/>
            </div>
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



// import {useQuery} from '@apollo/client'
//
// const GET_USERDATA = gql`
//     {
//         signIn(email: "du92kipppb@popcornfarm7.com", password: "123") {
//             token
//             user {
//                 email
//                 id
//                 avatar
//             }
//         }
//     }
// `;
//
// export const userData = () => {
//     return useQuery(GET_USERDATA)
// }