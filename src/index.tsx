import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import {AppContext} from "./AppContext";
import {ApolloContext} from "./ApolloContext";

ReactDOM.render(
    <AppContext>
        <ApolloContext>
            <Router>
                <App/>
            </Router>
        </ApolloContext>
    </AppContext>,
    document.getElementById('root')
);











