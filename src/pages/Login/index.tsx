import {gql, useLazyQuery} from "@apollo/client";
import React, {useContext, useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {AuthContext} from "../../App";
import ErrorMessage from '../../components/ErrorMessage'
import Input from "../../components/Input";
import "./Login.module.scss";
import style from "./Login.module.scss";
import {FormikConfig, useFormik} from "formik";
import Button from "../../components/Button";
import * as yup from "yup";

export interface UserCredentials {
    login: string;
    password: string;
}

const SIGIN = gql`
    query signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
            user {
                email
                id
                avatar
                login
            }
        }
    }
`;

const Login: React.FC = () => {
    
    const [doLogin, {loading, error, data}] = useLazyQuery(SIGIN);

    
    const validationSchema = yup.object({
        login: yup
            .string()
            .required()
            .min(2),
        password: yup
            .string()
            .required()
            .min(8)
            .max(30),
    })
    
    const formikConfig: FormikConfig<UserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: (values) => {
            
            doLogin({
                variables: {email: values.login, password: values.password},
            });
        
        },
        validationSchema
    };
    
    const formik = useFormik<UserCredentials>(formikConfig);
    
    const context = useContext(AuthContext);
    if (!context) {
        return null
    }
 
    return (
        <>
            <div className={style.wrap}>
                <div className={style.wrapperLogin}>
                    <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
                    <div className={style.header}>Welcome</div>
                    
                    <form noValidate onSubmit={formik.handleSubmit}>
                        
                        <Input
                            type={"text"}
                            id={"form-login-input"}
                            autoComplete={"off"}
                            inputError={formik.errors.login}
                            touched={formik.touched.login}
                            {...formik.getFieldProps('login')}
                        />
                        
                        <Input
                            type={"password"}
                            id={"form-password-input"}
                            autoComplete={"off"}
                            inputError={formik.errors.password}
                            touched={formik.touched.password}
                            {...formik.getFieldProps('password')}
                        />
                        <div className={style.buttonsWrapper}>
                            <Link to="/registration"><a className={style.a}>Registration</a></Link>
                            <Button type={"submit"} color={"primary"} size={'small'} > {loading ? "Loading..." : "Login"}</Button>
                        </div>
                        {/*<div className={style.errorMessage}> {error? error.graphQLErrors[0].message : null}</div>*/}
                        <ErrorMessage error={error.graphQLErrors[0].message}>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
