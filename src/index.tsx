import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {client} from './client'
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);












