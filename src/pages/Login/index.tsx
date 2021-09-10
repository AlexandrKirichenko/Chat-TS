import {FormikConfig, useFormik} from 'formik'
import React, {useContext } from 'react'
import "./Login.module.scss";
import * as yup from 'yup';
import Input from "../../components/Input";
import style from "./Registration.module.scss";
import classnames from 'classnames';
import Button from "../../components/Button";
import {AuthContext} from '../../App';

const INPUT_TEST_ERROR  = 'Error'


export interface UserCredentials {
    name: string;
    password: string;
}

const Login: React.FC = () => {
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
            
            <button type={"submit"}>SUBMIT</button>
        </form>
    )
}

export default Login;