import React, {useState, useContext} from 'react'
import "./Registration.module.scss";
import Input from "../../components/Input"
import style from "./Registration.module.scss";
import classnames from 'classnames';
import Button from "../../components/Button";
import {AuthContext} from '../../App';
import * as yup from 'yup';
import {FormikConfig, useFormik} from "formik";


const INPUT_TEST_ERROR = 'Error'

export interface UserCredentials {
    name: string;
    password: string;
}

const Registration: React.FC = () => {
    const context = useContext(AuthContext);
    
    const validationSchema = yup.object({
        name: yup
            .string()
            .required(),
        password: yup
            .string()
            .required()
            .min(8)
            .max(30),
    });
    const formikConfig: FormikConfig<UserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            name: '',
            password: '',
        },
        onSubmit: (values) => {
            const massage = `name: ${values.name}; password: ${values.password}`;
            alert(massage);
        },
        validationSchema
    };
    const formik = useFormik<UserCredentials>(formikConfig);
    
    if (context === null) {
        return null;
    }
    const {name, setName, password, setPassword, nameError, nameWasChanged, passwordWasChanged} = context;
    
    // const handleSubmitForm = (e: React.SyntheticEvent) => {
    //     // e.preventDefault();
    //     // const massage = `name: ${name}; password: ${password}`;
    //     // alert(massage);
    // }
    
    
    // const formik = useFormik<UserCredentials>(formikConfig);
    
    
    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Input
                type={"text"}
                id={"form-name-input"}
                autoComplete={"off"}
                inputError={''}
                setInputValue={val => formik.getFieldProps('name').onChange({
                    target: {
                        value: val,
                        name: formik.getFieldProps('name').name
                    },
                })}
                {...formik.getFieldProps('name')}
            />
            {formik.errors.name ? formik.errors.name : ''}
            <Input
                type={"password"}
                id={"form-password-input"}
                autoComplete={"off"}
                setInputValue={val => formik.getFieldProps('password').onChange({
                    target: {
                        value: val,
                        name: formik.getFieldProps('password').name
                    },
                })}
                inputError={''}
                {...formik.getFieldProps('password')}
            />
            {formik.errors.password ? formik.errors.password : ''}
    
            <Button type={"submit"} color={"primary"}> Login </Button>
        </form>
    )
}

export default Registration;













// import React, {useState, useContext } from 'react'
// import "./Registration.module.scss";
// import Avatar from '../../components/Avatar ';
// import Input from "../../components/Input";
// import style from "./Registration.module.scss";
// import classnames from 'classnames';
// import Button from "../../components/Button";
// import {AuthContext} from '../../App';
//
// const INPUT_TEST_ERROR  = 'Error'
//
// const Registration:React.FC = () => {
//     const context = useContext(AuthContext);
//     if (context === null) {
//         return null;
//     }
//     const  { name, setName, password, setPassword,nameError,nameWasChanged,passwordWasChanged} = context;
//
//     const handleSubmitForm = (e: React.SyntheticEvent) => {
//         e.preventDefault();
//         const massage = `name: ${name}; password: ${password}`;
//         alert(massage);
//     }
//
//     return (
//         <div className={style.wrap}>
//             <form onSubmit={handleSubmitForm}>
//                 <Input
//                     value={name}
//                     type={"text"}
//                     id={"form-name-input"}
//                     name={"Login"}
//                     setInputValue={setName}
//                     autoComplete={"off"}
//                     inputError={nameError}
//                     inputWasChanged={nameWasChanged}
//                 />
//                 <Input
//                     value={password}
//                     type={"password"}
//                     id={"form-password-input"}
//                     name={"Email"}
//                     setInputValue={setPassword}
//                     autoComplete={"off"}
//                     inputError={nameError}
//                     inputWasChanged={passwordWasChanged}
//                 />
//                 <Input
//                     value={name}
//                     type={"text"}
//                     id={"form-name-input"}
//                     name={"Password"}
//                     setInputValue={setName}
//                     autoComplete={"off"}
//                     inputError={nameError}
//                     inputWasChanged={nameWasChanged}
//                 />
//                 <Input
//                     value={password}
//                     type={"password"}
//                     id={"form-password-input"}
//                     name={"Repeat password"}
//                     setInputValue={setPassword}
//                     autoComplete={"off"}
//                     inputError={nameError}
//                     inputWasChanged={passwordWasChanged}
//                 />
//                 <div className={style.avatar_wrap}>
//                     <Avatar size={"large"} img={""} name={"Alex"}/>
//                     <Input
//                         value={password}
//                         type={"password"}
//                         id={"form-password-input"}
//                         name={"url"}
//                         setInputValue={setPassword}
//                         autoComplete={"off"}
//                         inputError={nameError}
//                         inputWasChanged={passwordWasChanged}
//                         size={'small'}
//                     />
//                 </div>
//                 <Button children={'Login'}/>
//
//             </form>
//         </div>
//
//     )
// }
//
// export default Registration;