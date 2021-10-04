import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {LS_TOKEN_KEY} from "./config";
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

 const wsLink = new WebSocketLink({
    
    
    uri: "wss://test-chat-be.herokuapp.com/graphql",
    options: {
         reconnect: true
    },

 });
const httpLink = new HttpLink({
    uri: process.env.REACT_APP_MY_COOL_LINK,
})

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

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
    link: authLink.concat(splitLink),
});






// import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
// import {setContext} from '@apollo/client/link/context'
// import {LS_TOKEN_KEY} from "./config";
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { split, HttpLink } from '@apollo/client';
// import { getMainDefinition } from '@apollo/client/utilities';
//
//
// const wsLink = new WebSocketLink({
//
//     uri: "wss://test-chat-be.herokuapp.com/graphql",
//     options: {
//         reconnect: true
//     },
//
// });
//
// const httpLink = new HttpLink({
//     uri: process.env.REACT_APP_MY_COOL_LINK,
// })
//
// const authLink = setContext((_, { headers }) => {
//     const token = localStorage.getItem(LS_TOKEN_KEY) || null;
//     return {
//         headers: {
//             ...headers,
//             'access-token': token ? `${token}` : "",
//         }
//     }
// });
//
//
// const wrappedHHTPLink = authLink.concat(httpLink);
// const cache = new InMemoryCache();
//
// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     wsLink,
//     wrappedHHTPLink,
// );
//
//
// export const client = new ApolloClient({
//     cache,
//     link : splitLink
// });



