import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {LS_TOKEN_KEY} from "./config";
import { WebSocketLink } from '@apollo/client/link/ws';

// const wsLink = new WebSocketLink({
//     uri: process.env.REACT_APP_MY_LINK_WS,
//     options: {
//         reconnect: true
//     }
// });

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_MY_COOL_LINK,
})

const authLink = setContext((_, { headers }) => {
    
    const token = localStorage.getItem(LS_TOKEN_KEY) || null;
    
    return {
        headers: {
            ...headers,
            'access-token': token ? `${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});













