import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

// function getUser() {
//     const userObj = localStorage.getItem('user');
//
//     if (userObj && userObj.length > 0) {
//         return JSON.parse(userObj)
//     } else {
//         return null;
//     }
// }

// const httpLink = createHttpLink({
//     uri: process.env.REACT_APP_MY_COOL_LINK,
//     headers: {
//         'access-token': getUser()?.token || null
//     }
// })
//
// export const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: httpLink
// })
// --------------------------------------------


const httpLink = createHttpLink({
    uri: process.env.REACT_APP_MY_COOL_LINK,
})

const authLink = setContext((_, { headers }) => {

    const token = localStorage.getItem('token') || null;

    return {
        headers: {
            ...headers,
            'access-token': token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});















