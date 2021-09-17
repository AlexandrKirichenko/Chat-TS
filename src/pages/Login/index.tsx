import {gql, useLazyQuery} from "@apollo/client";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../App";
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
            login: 'du92kippp2fgbf+werhd+@popcornfarm7.com',
            password: '12334254',
        },
        onSubmit: (values) => {
            // const message = JSON.stringify(values, null, 2);
            // alert(message);
            
            doLogin({
                variables: {email: values.login, password: values.password},
            });
            setLoginFormValues(values);
        },
        validationSchema
    };
    
    const formik = useFormik<UserCredentials>(formikConfig);
    
    const context = useContext(AuthContext);
    if (!context) {
        return null
    }
    const {setLoginFormValues} = context;
    
    return (
        <>
            <pre>{data ? JSON.stringify(data, null, 2) : null}</pre>
            
            <pre>{error ? JSON.stringify(error, null, 2) : null}</pre>
            
            
            
            <div className={style.wrap}>
                <div className={style.wrapperLogin}>
                    <div className={style.header}>Welcome</div>
                    
                    <div>{loading ? <div>Loading...</div> : null}</div>
                    
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
                            <Button type={"submit"} color={"primary"} size={'small'} disabled={!(formik.isValid && formik.dirty)}> Login </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
