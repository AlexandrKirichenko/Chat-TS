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
          {/*<Input*/}
          {/*    value={inputValue}*/}
          {/*    type={"text"}*/}
          {/*    id={"b34234"}*/}
          {/*    name={"Password"}*/}
          {/*    setInputValueCb={setInputValue}*/}
          {/*    errorMsg={INPUT_TEST_ERROR}*/}
          {/*/>*/}
      </>
  )
}

export default Registration;