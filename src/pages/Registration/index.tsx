import React, {useState, useContext } from 'react'
import "./Registration.module.scss";
import Input from "../../components/Input"
import style from "./Registration.module.scss";
import classnames from 'classnames';
import Button from "../../components/Button";
import {AuthContext} from '../../App';


const INPUT_TEST_ERROR  = 'Error'


const Registration:React.FC = () => {
    const AuthContext = useContext(AuthContext);
    if (AuthContext === null) {
        return null;
    }
    const AuthContextData = { inputValue, setInputValue };
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const massage = `name: ${name}; password: ${password}`;
        alert(massage);
    }
    
    return (
        <form onSubmit={handleSubmitForm}>
            <Input
                value={name}
                type={"text"}
                id={"form-name-input"}
                name={"name"}
                setInputValue={setName}
                autoComplete={"off"}
            />
            <Input
                value={password}
                type={"text"}
                id={"form-password-input"}
                name={"Password"}
                setInputValue={setPassword}
                autoComplete={"off"}
            />
            <button type={'submit'}>submit</button>
        </form>
    )
}

export default Registration;