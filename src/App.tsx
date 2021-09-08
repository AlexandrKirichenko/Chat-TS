import React, {useState} from "react";
import "./App.css";
import Layout from "./components/Layout";
import Avatar from "./components/Avatar";
import Input from "./components/Input";
import Button from "./components/Button";

const INPUT_TEST_ERROR  = 'Error'

function App() {
    const [inputValue, setInputValue] = useState('');
    
    return (
        <>
            <Layout>
                <Input
                    value={inputValue}
                    type={"text"}
                    id={"b34234"}
                    name={"Password"}
                    setInputValueCb={setInputValue}
                    errorMsg={INPUT_TEST_ERROR}
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
