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
                <App />
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
);






