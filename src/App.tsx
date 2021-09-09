import React, {useState} from "react";
import "./App.css";
import Layout from "./components/Layout";
import Registration from './pages/Registration'
import Avatar from "./components/Avatar ";
import Input from "./components/Input";
import Button from "./components/Button";

const INPUT_TEST_ERROR  = 'Error'

function App() {
    const [inputValue, setInputValue] = useState('');
    // const [inputDirty, setEmailDirty] =useState(false)
    // const [emailError, setEmailError] =useState('Email cant be empty')
    return (
        <>
            <Layout>
                {/*<Registration />*/}
                <Input
                    value={inputValue}
                    type={"text"}
                    id={"b34234"}
                    name={"Password"}
                    setInputValue={setInputValue}
                    errorMessage={INPUT_TEST_ERROR}
                    autoComplete={"off"}
                    errorcolor={'errorcolor'}
                />
                <Input
                    value={inputValue}
                    type={"text"}
                    id={"b34234"}
                    name={"Password"}
                    setInputValue={setInputValue}
                    autoComplete={"off"}
                />
                <Button buttonName={"Register"} color={"primary"}> Login </Button>
                <Button buttonName={"Login"} color={"secondary"}> Registration </Button>
                <Avatar size={"large"} img={""} name={"Alex"}/>
                <Avatar size={"medium"} img={""} name={"Alex"}/>
            </Layout>
        
        </>
    );
}

export default App;