import React, {useState} from 'react'
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
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

const serchChekinME = gql`
    query {
        me {
            user {
                id
                email
            }
        }
    }
`;


function ExchangeRates() {
    const { loading, error, data } = useQuery(serchChekinME);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return data.rates.map(({ currency, rate } : {currency : any, rate : any}) => (
        <div key={currency}>
            <p>
                {currency}: {rate}
            </p>
        </div>
    ));
}


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