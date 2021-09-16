import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
console.log(process.env.REACT_APP_MY_COOL_LINK);
export const client = new ApolloClient({
    uri: process.env.REACT_APP_MY_COOL_LINK,
    cache: new InMemoryCache(),
    link: createHttpLink({
        uri: process.env.REACT_APP_MY_COOL_LINK,
        headers: {
            'access-token': localStorage.getItem('access-token') || null,
        }
    })
});