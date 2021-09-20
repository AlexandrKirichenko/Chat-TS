import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_MY_COOL_LINK,
})

const authLink = setContext((_, { headers }) => {
    
    const token = localStorage.getItem('token') || null;
    
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













