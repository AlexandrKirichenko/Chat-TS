import {useQuery} from "@apollo/client";
import React, {useContext, useEffect, useState} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Layout from "./components/Layout";
import {PATH_CHAT_BLOCK, PATH_LOGIN, PATH_REGISTRATION} from "./config";
import ChatBlock from "./pages/ChatBlock";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {ME} from "./schemas";
import {appContext} from "./AppContext";


function App() {
    const {data} = useQuery(ME);
    const history = useHistory();
    useEffect(() => {
        if (data) {
            setIsAuthorized(true);
            setUser(data.me.user);
            history.push(PATH_CHAT_BLOCK);
        }
    }, [data]);
    const context = useContext(appContext);
    if (!context) {
        return null
    }
    
    const {setIsAuthorized, setUser, isAuthorized} = context;
    
    return (
        <>
            
            <Header nameAvatar={""}/>
            <Layout>
                <Switch>
                    <Route exact path={PATH_LOGIN}>
                        <Login/>
                    </Route>
                    <Route path={PATH_REGISTRATION}>
                        <Registration/>
                    </Route>
                    <Route path={PATH_CHAT_BLOCK}>
                        {isAuthorized ? <ChatBlock/> : <div>You need to login</div>}
                    </Route>
                </Switch>
            </Layout>
        </>
    );
}

export default App;
