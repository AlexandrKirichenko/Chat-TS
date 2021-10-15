import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {ApolloProvider} from "@apollo/client";
import {client} from './client'
import {BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './store/index'

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);




