import {gql} from '@apollo/client'

export const SIGIN = gql`
    query signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
            token
            user {
                email
                id
                avatar
                login
            }
        }
    }
`;

export const REGISTER = gql`
    mutation registration(
        $avatar: String!
        $email: String!
        $password: String!
        $login: String!
    ) {
        registration(
            avatar: $avatar,
            email: $email,
            password: $password,
            login: $login,
        )
        {
            token
            user {
                login
                email
                id
                avatar
            }
        }
    }
`;

export const ME = gql`
    query {
        me {
            user{
                login
                email
                avatar
                id
            }
            token
        }
    }
`;
