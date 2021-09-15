import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route,Switch,useHistory} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import {LoginUserCredentials, RegistrationUserCredentials} from "./types";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";



interface ChekMeProp {
    children: React.ReactNode;
}

export interface IAuthContext {
    loginFormValues:LoginUserCredentials| null,
    setLoginFormValues: (values: LoginUserCredentials)=> void | null;
    registrationFormValues: RegistrationUserCredentials | null,
    setRegistrationFormValues: (values: RegistrationUserCredentials)=> void | null;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

const ME = gql`
    query {
        me {
            user {
                id
                email
            }
        }
    }
`;

const CheckMe= ({ children } : {children:ChekMeProp }) => {
    const router = useHistory()
    const { loading, data, error } = useQuery(ME)
    useEffect(() => {
        router.push('/')
    }, [])
    if (loading) {
        return 'loading...'
    }
    
    if (error) {
        return error
    }
    
    if (!data?.me?.user) {
        return null
    }
    
    return children
}

const App = () => {
    
    const [loginFormValues, setLoginFormValues] = useState<LoginUserCredentials | null>(null)
    const [registrationFormValues, setRegistrationFormValues] = useState<RegistrationUserCredentials | null>(null)
    
    const AuthContextData = {loginFormValues, setLoginFormValues, registrationFormValues, setRegistrationFormValues}
    
    
    
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