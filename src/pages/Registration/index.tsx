import {FormikConfig, useFormik} from 'formik'
import React, {useContext} from 'react'
import "./Registration.module.scss";
import * as yup from 'yup';
import Avatar from "../../components/Avatar ";
import Input from "../../components/Input";
import AvatarInput from "../../components/AvatarInput"
import style from "./Registration.module.scss";
import classnames from 'classnames';
import {AuthContext} from '../../App';
import {RegistrationUserCredentials} from "../../types";
import Button from "../../components/Button";



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
            .matches(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, "Please enter correct url")
    })
    
    const formikConfig: FormikConfig<RegistrationUserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            name: '',
            password: '',
            confirmPassword: '',
            email: '',
            url:''
        },
        onSubmit: (values) => {
            console.log(values);
            const message = JSON.stringify(values, null, 2);
            alert(message);
            setRegistrationFormValues(values);
        },
        validationSchema,
    };
    
    const formik = useFormik<RegistrationUserCredentials>(formikConfig);
    
    if (context === null) {
        return null;
    }
    const {setRegistrationFormValues} = context;
   
    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <Input
                type={"text"}
                id={"form-name-input"}
                autoComplete={"off"}
                inputError = {formik.errors.name}
                touched = {formik.touched.name}
                {...formik.getFieldProps('name')}
            />
           
            <Input
                type={"text"}
                id={"form-email-input"}
                autoComplete={"off"}
                inputError = {formik.errors.email}
                touched = {formik.touched.email}
                {...formik.getFieldProps('email')}
            />
            <Input
                type={"password"}
                id={"form-password-input"}
                autoComplete={"off"}
                inputError = {formik.errors.password}
                touched = {formik.touched.password}
                {...formik.getFieldProps('password')}
            />
            
            <Input
                type={"password"}
                id={"form-confirmPassword-input"}
                autoComplete={"off"}
                inputError = {formik.errors.confirmPassword}
                touched = {formik.touched.confirmPassword}
                {...formik.getFieldProps('confirmPassword')}
            />
            <AvatarInput
                url={""}
                nameAvatar={"Alex"}
                sizeAvatar={"large"}
                inputProps={
                    type={"text"}
                    id={"form-url-input"}
                    autoComplete={"off"}
                    inputError = {formik.errors.url}
                    touched = {formik.touched.url}
                    size={"small"}
                    url={formik.getFieldProps('url').value}
                    
                }
                
                
                
                type={"text"}
                id={"form-url-input"}
                autoComplete={"off"}
                inputError = {formik.errors.url}
                touched = {formik.touched.url}
                size={"small"}
                url={formik.getFieldProps('url').value}
            />
            {/*<Avatar url={""} name={"Alex"} size={"large"}/>*/}
            {/*<Input*/}
            {/*    type={"text"}*/}
            {/*    id={"form-url-input"}*/}
            {/*    autoComplete={"off"}*/}
            {/*    inputError = {formik.errors.url}*/}
            {/*    touched = {formik.touched.url}*/}
            {/*    size={"small"}*/}
            {/*    {...formik.getFieldProps('url')}*/}
            {/*/>*/}
            
            <Button type={"submit"} color={"primary"} disabled={!(formik.isValid && formik.dirty)}> Register </Button>
        </form>
    )
}

export default Registration;