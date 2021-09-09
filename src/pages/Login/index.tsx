import React, {useState} from 'react'
import "./Registration.module.scss";
import Input from "../../components/Input"
import style from "./Login.module.scss";
import classnames from 'classnames';

interface Login {

}
const INPUT_TEST_ERROR  = 'Error'

const Registration:React.FC<any> = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputDirty, setEmailDirty] =useState(false)
    return (
        <>
            <div className="container">
                <div className={style.header}>Welcome</div>
                <Input
                    value={inputValue}
                    type={"email"}
                    id={"b34234"}
                    name={"Email"}
                    setInputValue={setInputValue}
                    autoComplete={"off"}
                />
                <Input
                    value={inputValue}
                    type={"password"}
                    id={"b34234"}
                    name={"Password"}
                    setInputValue={setInputValue}
                    autoComplete={"off"}
                />
                <a className={style.registration} href="#">Registration</a>
            </div>
            
        </>
    )
}

export default Registration;