import {ApolloClient, InMemoryCache} from '@apollo/client'

export const client = new ApolloClient({
    uri: process.env.REACT_APP_MY_COOL_LINK,
    cache: new InMemoryCache()
});