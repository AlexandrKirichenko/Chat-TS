import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import Input from "../../components/Input";
import "./Login.module.scss";
import style from "./Login.module.scss";

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
    const context = useContext(AuthContext);
    const [doLogin, { loading, error, data }] = useLazyQuery(SIGIN);
    const [login, setLogin] = useState<string>(
        "du92kippp2fgbf+werhd+@popcornfarm7.com"
    );
    const [password, setPassword] = useState<string>("12334254");
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (data) {
        localStorage.setItem(
            "user",
            JSON.stringify({ token: data.signIn.token, user: data.signIn.user })
        );
        return <div>Logged in as: {data.signIn.user.email}</div>;
    }
    return (
        <>
            <div className={style.wrap}>
                <div className={style.wrapperLogin}>
                    <div className={style.header}>Welcome</div>
                    <Input
                        name={"login"}
                        inputError={undefined}
                        type={"text"}
                        id={"form-login-input"}
                        autoComplete={"off"}
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    
                    <Input
                        name={"password"}
                        inputError={undefined}
                        type={"password"}
                        id={"form-password-input"}
                        autoComplete={"off"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <div className={style.buttonsWrapper}>
                        <Link to="/registration">
                            <a className={style.a}>Registration</a>
                        </Link>
                        <button
                            type={"submit"}
                            color={"primary"}
                            onClick={async () => {
                                const res = await doLogin({
                                    variables: { email: login, password: password },
                                });
                                console.log({ res });
                            }}
                        >
                            {" "}
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
