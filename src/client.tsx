import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'



function getUser() {
    const userObj = localStorage.getItem('user');
    console.log('Load user from localstorage: ', userObj)
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





















//
// const httpLink = createHttpLink({
//     uri: '/graphql',
// });
//
// const authLink = setContext((_, { headers }) => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('token');
//     // return the headers to the context so httpLink can read them
//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         }
//     }
// });
//
// const client = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache: new InMemoryCache()
// });


// ------
// const uri = "process.env.REACT_APP_MY_COOL_LINK";
// const link = createHttpLink({
//     uri: process.env.REACT_APP_MY_COOL_LINK,
// });
//
// const authLink = setContext(({_, headers }) => {
//
//     const token = localStorage.getItem('access-token') || null;
//
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
//     link: authLink.concat(link)
// });
// ---------------------

//
// const authLink = setContext(({ headers }) => {
//
//     const token = localStorage.getItem('access-token');
//
//     return {
//         headers: {
//             ...headers,
//             'access-token': token ? `Bearer ${token}` : "",
//         }
//     }
// });
//
// export const client = new ApolloClient({
//     uri: process.env.REACT_APP_MY_COOL_LINK,
//     cache: new InMemoryCache(),
//     link: authLink.concat(link)
// });
