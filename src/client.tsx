import {ApolloClient, InMemoryCache,createHttpLink} from '@apollo/client'

function getUser() {
    const userObj = localStorage.getItem('user');
    
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

















