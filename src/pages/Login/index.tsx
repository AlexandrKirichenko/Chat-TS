import React, {useContext } from 'react'
import "./Login.module.scss";
import Input from "../../components/Input"
import style from "./Registration.module.scss";
import classnames from 'classnames';
import Button from "../../components/Button";
import {AuthContext} from '../../App';

const INPUT_TEST_ERROR  = 'Error'

const Registration:React.FC = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        return null;
    }
    const  { name, setName, password, setPassword,nameWasChanged,passwordWasChanged,nameError,passwordError} = context;
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    
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
                inputWasChanged={nameWasChanged}
                inputError={nameError}
                setInputWasChanged={nameWasChanged}
            />
            <Input
                value={password}
                type={"password"}
                id={"form-password-input"}
                name={"Password"}
                setInputValue={setPassword}
                autoComplete={"off"}
                inputWasChanged={passwordWasChanged}
                inputError={passwordError}
                setInputWasChanged={passwordWasChanged}
            />
            <Button />
        </form>
    )
}

export default Registration;