import { useLazyQuery} from "@apollo/client";
import React, {useEffect} from 'react'
import {Link, useHistory} from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage'
import Input from "../../components/Input";
import "./Login.module.scss";
import style from "./Login.module.scss";
import {FormikConfig, useFormik} from "formik";
import Button from "../../components/Button";
import * as yup from "yup";
import {SIGIN} from "../../schemas";
import {PATH_CHAT_BLOCK} from "../../config";
import {useAppDispatch} from '../../store/hooks'
import {appActions} from '../../store/appSlice'

export interface UserCredentials {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  
  const [doLogin, {loading, error, data}] = useLazyQuery(SIGIN);
  const history = useHistory();
  const dispatch = useAppDispatch();
  
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
  
  useEffect(() => {
    if (data) {
      const token = data?.signIn?.token
      localStorage.setItem('token', token);
      
      dispatch(appActions.setIsAuthorized(true));
      dispatch(appActions.setUser(data.signIn.user));
      history.push(PATH_CHAT_BLOCK);
    }
  }, [data])
  
  return (
    <>
      <div className={style.wrap}>
        <div className={style.wrapperLogin}>
          
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
              <Button type={"submit"} color={"primary"}
                      size={'small'}> {loading ? "Loading..." : "Login"}</Button>
            </div>
            <ErrorMessage error={error && error.graphQLErrors[0].message}/>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
