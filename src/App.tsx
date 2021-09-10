import React, {useState} from "react";
import "./App.css";
import Layout from "./components/Layout";
import Registration from './pages/Registration'
import Avatar from "./components/Avatar ";
import Input from "./components/Input";
import Button from "./components/Button";
// import {AuthContext} from './context/context'

const INPUT_TEST_ERROR  = 'Error'

export interface IAuthContext {
    name:string;
    setName(value: string): void;
    password:string;
    setPassword(value: string): void;
    nameError: string;
    setNameError(value: string): void;
    nameWasChanged: boolean;
    setNameWasChanged(value: boolean): boolean;
    passwordError: string;
    setPasswordError(value: boolean): boolean;
    passwordWasChanged: boolean;
    setPasswordWasChanged(value: boolean): boolean;
}

export const AuthContext = React.createContext<IAuthContext | null>(null);

function App() {
    // const [inputValue, setInputValue] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameWasChanged, setNameWasChanged] =useState(false);
    const [passwordWasChanged, setPasswordWasChanged] =useState(false);
    const [nameError, setNameError] =useState('Email cant be empty');
    const [passwordError, setPasswordError] =useState('Email cant be empty');
    const AuthContextData = { name, setName,password, setPassword,nameWasChanged,setNameWasChanged,passwordWasChanged,
        setPasswordWasChanged,nameError, setNameError, passwordError,setPasswordError};
    return (
        <>
            <AuthContext.Provider value={AuthContextData}>
                <Layout>
                    <Registration />
                    {/*<Input*/}
                    {/*    value={inputValue}*/}
                    {/*    type={"email"}*/}
                    {/*    id={"b34234"}*/}
                    {/*    name={"Password"}*/}
                    {/*    setInputValue={setInputValue}*/}
                    {/*    errorMessage={INPUT_TEST_ERROR}*/}
                    {/*    autoComplete={"off"}*/}
                    {/*    errorcolor={'errorcolor'}*/}
                    {/*/>*/}
                    <Button color={"primary"}> Login </Button>
                    <Button color={"secondary"}> Registration </Button>
                    <Avatar size={"large"} img={""} name={"Alex"}/>
                    <Avatar size={"medium"} img={""} name={"Alex"}/>
                </Layout>
            </AuthContext.Provider >
        </>
    );
}

export default App;