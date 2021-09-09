import React, {useState} from 'react'
import "./Registration.module.scss";
import Input from "../../components/Input"
import style from "./Registration.module.scss";
import classnames from 'classnames';

interface Registration {

}
const INPUT_TEST_ERROR  = 'Error'

const Registration:React.FC<any> = () => {
    const [inputValue, setInputValue] = useState('');
  return (
      <>
          <Input
              value={inputValue}
              type={"text"}
              id={"b34234"}
              name={"Password"}
              setInputValue={setInputValue}
              autoComplete={"off"}
          />
          <Input
              value={inputValue}
              type={"text"}
              id={"b34234"}
              name={"Password"}
              setInputValue={setInputValue}
              autoComplete={"off"}
          />
         
      </>
  )
}

export default Registration;