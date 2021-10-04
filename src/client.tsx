import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'
import {LS_TOKEN_KEY} from "./config";
import {WebSocketLink} from '@apollo/client/link/ws';
import {split, HttpLink} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';

export const getApolloClient = (appToken: string | null = null) => {
    let token: string | null = null;
    
    if (appToken) {
        token = appToken;
    } else {
        token = localStorage.getItem(LS_TOKEN_KEY) || null;
    }
    
    const wsLink = new WebSocketLink({
        
        uri: "wss://test-chat-be.herokuapp.com/graphql",
        options: {
            reconnect: true,
            connectionParams: {
                'access-token': token ? `${token}` : "",
            },
        },
    });
    
    const httpLink = new HttpLink({
        uri: process.env.REACT_APP_MY_COOL_LINK,
    })
    
    const splitLink = split(
        ({query}) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );
    
    const authLink = setContext((_, {headers}) => {
        console.log(1);
        return {
            headers: {
                ...headers,
                'access-token': token ? `${token}` : "",
            }
        }
    });
    
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(splitLink),
    });
}
