import {FormikConfig, useFormik} from 'formik'
import React, {useContext} from 'react'
import "./Registration.module.scss";
import * as yup from 'yup';
import Avatar from '../../components/Avatar '
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
    url?: string;
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
            .string().oneOf([yup.ref('password')], "Password mismatch")
            .required()
            .min(8)
            .max(30),
        url: yup
            .string()
            .notRequired()
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
            console.log(values);
            const massage = `name: ${values.name};email: ${values.email}, password: ${values.password}`;
            alert(massage);
            // setName(values.name);
            // setEmail(values.email);
        },
        validationSchema,
        
    };
    const formik = useFormik<UserCredentials>(formikConfig);
    
    
    if (context === null) {
        return null;
    }
    const {name, setName, password, setPassword} = context;
    
    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Input
                type={"text"}
                id={"form-name-input"}
                autoComplete={"off"}
                inputError={formik.errors.name && formik.touched.name ? formik.errors.name : ''}
                {...formik.getFieldProps('name')}
               
            />
            
            <Input
                type={"text"}
                id={"form-email-input"}
                autoComplete={"off"}
                inputError={''}
                {...formik.getFieldProps('email')}
            />
            {formik.errors.email && formik.touched.email ? formik.errors.email : ''}
            <Input
                type={"password"}
                id={"form-password-input"}
                autoComplete={"off"}
                
                inputError = {formik.errors.password}
                touched = {formik.touched.password}
            />
            
            
            <Input
                type={"password"}
                id={"form-confirmPassword-input"}
                autoComplete={"off"}
                inputError={''}
                {...formik.getFieldProps('confirmPassword')}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
    
            <Avatar img={""} name={"Alex"} size={"large"}/>
            <Input
                type={"text"}
                id={"form-url-input"}
                autoComplete={"off"}
                inputError={''}
                size={"small"}
                {...formik.getFieldProps('url')}
            />
            {formik.errors.url && formik.touched.url ? formik.errors.url : ''}
    
            <Button type={"submit"} color={"primary"}> Login </Button>
        </form>
    )
}

export default Registration;