import {FormikConfig, useFormik} from 'formik'
import React, {useContext } from 'react'
import "./Registration.module.scss";
import * as yup from 'yup';
import Input from "../../components/Input";
import style from "./Registration.module.scss";
import classnames from 'classnames';
import Button from "../../components/Button";
import {AuthContext} from '../../App';

export interface UserCredentials {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
}

const Registration: React.FC = () => {
    const context = useContext(AuthContext);
    
    const validationSchema = yup.object({
        name: yup
            .string()
            .matches(/^([^0-9]*)$/, "Name should not contain numbers")
            .required()
            .min(2),
        email: yup
            .string()
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter your email address")
            .required(),
        password: yup
            .string()
            .required()
            .min(8)
            .max(30),
        confirmPassword: yup
            .string().oneOf([yup.ref('password')], "Password mismatch" )
            .required()
            .min(8)
            .max(30),
    })
    
    const formikConfig: FormikConfig<UserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
            
        },
        onSubmit: (values) => {
            const massage = `name: ${values.name};email: ${values.email}, password: ${values.password}`;
            alert(massage);
        },
        validationSchema
    };
    const formik = useFormik<UserCredentials>(formikConfig);
    
    
    if (context === null) {
        return null;
    }
    const {name, setName, password, setPassword, nameError, nameWasChanged, passwordWasChanged} = context;
    
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
            {formik.errors.name && formik.getFieldProps('name').value ? formik.errors.name : ''}
    
            <Input
                type={"text"}
                id={"form-email-input"}
                autoComplete={"off"}
                inputError={''}
                setInputValue={val => formik.getFieldProps('email').onChange({
                    target: {
                        value: val,
                        name: formik.getFieldProps('email').name
                    },
                })}
                {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.getFieldProps('email').value ? formik.errors.email : ''}
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
            {formik.errors.password && formik.getFieldProps('password').value? formik.errors.password : ''}
    
            <Input
                type={"password"}
                id={"form-confirmPassword-input"}
                autoComplete={"off"}
                setInputValue={val => formik.getFieldProps('confirmPassword').onChange({
                    target: {
                        value: val,
                        name: formik.getFieldProps('confirmPassword').name
                    },
                })}
                inputError={''}
                {...formik.getFieldProps('confirmPassword')}
            />
            {formik.errors.password && formik.getFieldProps('password').value? formik.errors.password : ''}
            
            <Button type={"submit"} color={"primary"}> Login </Button>
        </form>
    )
}

export default Registration;