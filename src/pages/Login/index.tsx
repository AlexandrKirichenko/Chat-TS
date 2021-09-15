import {FormikConfig, useFormik} from 'formik'
import React, {useContext } from 'react'
import {Link} from 'react-router-dom'
import "./Login.module.scss";
import * as yup from 'yup';
import Input from "../../components/Input";
import style from "./Login.module.scss";
import classnames from 'classnames';
import Button from "../../components/Button";
import {AuthContext} from '../../App';

export interface UserCredentials {
    login: string;
    password: string;
}

const Login: React.FC = () => {
    const context = useContext(AuthContext);
    
    const validationSchema = yup.object({
        login: yup
            .string()
            .matches(/^([^0-9]*)$/, "Name should not contain numbers")
            .required(),
    });
    const formikConfig: FormikConfig<UserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            login: '',
            password: '',
        },
        onSubmit: (values) => {
            const message = JSON.stringify(values, null, 2);
            alert(message);
            setLoginFormValues(values);
        },
        validationSchema
    };
    const formik = useFormik<UserCredentials>(formikConfig);
    
    if (context === null) {
        return null;
    }
    const {setLoginFormValues} = context;

    return (
        <>
            <div className = {style.wrap}>
                <div className={style.wrapperLogin}>
                    <div className={style.header}>Welcome</div>
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <Input
                            type={"text"}
                            id={"form-login-input"}
                            autoComplete={"off"}
                            inputError = {formik.errors.login}
                            touched = {formik.touched.login}
                            {...formik.getFieldProps('login')}
                        />
        
                        <Input
                            type={"password"}
                            id={"form-password-input"}
                            autoComplete={"off"}
                            inputError = {formik.errors.password}
                            touched = {formik.touched.password}
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
       
    )
}

export default Login;