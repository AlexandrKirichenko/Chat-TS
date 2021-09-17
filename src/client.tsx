import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'

function getUser() {
    const userObj = localStorage.getItem('user');
    // console.log('Load user from localstorage: ', userObj)
    if (userObj && userObj.length > 0) {
        return JSON.parse(userObj)
    } else {
        return null;
    }
}

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_MY_COOL_LINK,
    headers: {
        'access-token': getUser()?.token || null
    }
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink
})










// old
// import { setContext } from '@apollo/client/link/context';
//
//
// const httpLink = createHttpLink({
//     uri: process.env.REACT_APP_MY_COOL_LINK,
//     headers: {
//         'access-token': localStorage.getItem('access-token') || null}
// })
//
// const authLink = setContext((_, { headers }) => {
//
//     const token = localStorage.getItem('token') || null;
//     console.log(token);
//     return {
//         headers: {
//             ...headers,
//             'access-token': token ? `Bearer ${token}` : "",
//         }
//     }
// });
//
// export const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: authLink.concat(httpLink)
// });
















