import {useMutation} from '@apollo/client'
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


const REGISTER = gql`
    mutation {
        registration(
            avatar: "https://avatarfiles.alphacoders.com/798/79894.jpg"
            email: "du92kippp2bf+werhd+@popcornfarm7.com"
            password: "1234254"
            login: "test277d7+6+d"
        ) {
            token
            user {
                login
                email
                id
                avatar
            }
        }
    }
`;

const Registration: React.FC = () => {
    const context = useContext(AuthContext);
    const [registrationUser, {data}] = useMutation(REGISTER)
    // const [addUser, {loading}] = useMutation(REGISTER, {
    //     update(proxy, result){
    //         console.log(result)
    //     },
    //     variables: values;
    // })
    
    const validationSchema = yup.object({
        login: yup
            .string()
            .matches(/^([^0-9]*)$/, "Name should not contain numbers")
            .required()
            .min(2),
        email: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .required()
            .min(8)
            .max(30),
        repeatPassword: yup
            .string().oneOf([yup.ref('password')], "Password mismatch")
            .required()
            .min(8)
            .max(30),
        url: yup
            .string()
            .notRequired()
            .url('Please enter correct url')
    })
    
    const formikConfig: FormikConfig<RegistrationUserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            login: '',
            password: '',
            repeatPassword: '',
            email: '',
            url: ''
        },
        onSubmit: (values) => {
            console.log(values);
            const message = JSON.stringify(values, null, 2);
            addUser(
            
            );
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
        <div className={style.wrap}>
            <div className={style.wrapForm}>
                <div className={style.headerForm}>Registration</div>
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
                        type={"text"}
                        id={"form-email-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.email}
                        touched={formik.touched.email}
                        {...formik.getFieldProps('email')}
                    />
                    <Input
                        type={"password"}
                        id={"form-password-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.password}
                        touched={formik.touched.password}
                        {...formik.getFieldProps('password')}
                    />
            
                    <Input
                        type={"password"}
                        id={"form-repeatPassword-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.repeatPassword}
                        touched={formik.touched.repeatPassword}
                        {...formik.getFieldProps('repeatPassword')}
                    />
                    <AvatarInput
                        inputProps={{
                            type: "text",
                            id: "form-url-input",
                            autoComplete: 'off',
                            inputError: formik.errors.url,
                            touched: formik.touched.url,
                            ...formik.getFieldProps('url')
                        }}
                        avatarProps={{
                            url: formik.getFieldProps('url').value,
                            nameAvatar: formik.getFieldProps('login').value,
                            sizeAvatar: "large"
                        }}
                    />
                    <div className={style.button}>
                        <Button type={"submit"} color={"primary"} size={'small'} disabled={!(formik.isValid && formik.dirty)}> Register </Button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default Registration;
