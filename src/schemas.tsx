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

export const GET_ALL_MESSAGES = gql`
    query getAllMessages($convId:Int) {
      getAllMessages(convId:$convId)
             {
                id
                description
                userId
                date
                user{
                    login
                    avatar
                }
            }
        }
`;

export const MESSAGE_ADDED_SUB = gql`
    subscription messageAdded($date: DateTime!) {
        messageAdded(date:$date)  {
            id
            description
            userId
            convId
            date
            user {
                id
                login
                email
                avatar
            }
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation createMessage($description:String!,$convId:Int)
    { createMessage(description:$description,convId:$convId){
        id
        description
        userId
        convId
        date
        user {
            login
            email
            avatar
        }
    }
    }
`;

export const GET_ALL_CONVERSATIONS = gql`
  query getAllConversations {
  getAllConversations {
    id
    createdBy
    name
    date
  }
}
`;

export const CREATE_CONVERSATION = gql`
  mutation createConversation(
    $name:String!) {
    createConversation(name:$name) {
      id
      createdBy
      name
      date
    }
  }
`;

export const CONVERSATION_ADDED_SUB = gql`
    subscription conversationAdded {
        conversationAdded
        {
            id
            createdBy
            name
            date
        }
    }
`;






