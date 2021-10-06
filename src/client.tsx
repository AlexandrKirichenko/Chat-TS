import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client";
import { LS_TOKEN_KEY } from "./config";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { SubscriptionClient } from 'subscriptions-transport-ws'

const wsClient = new SubscriptionClient("wss://test-chat-be.herokuapp.com/graphql",{
    reconnect: false,
    connectionParams: () => ({
        "access-token": localStorage.getItem(LS_TOKEN_KEY) || null,
    }),
});

const wsLink = new WebSocketLink(wsClient)

wsClient.onConnected(() => console.log("websocket connected!!"))
wsClient.onDisconnected(() => console.log("websocket disconnected!!"))
wsClient.onReconnected(() => console.log("websocket reconnected!!"))

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_MY_COOL_LINK,
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem(LS_TOKEN_KEY) || null;
    operation.setContext(({ context = {}, headers = {} }) => {
        return {
            context: {
                ...context,
                "access-token": token ? `${token}` : "",
            },
            headers: {
                ...headers,
                "access-token": token ? `${token}` : "",
            },
        };
    });
    return forward(operation);
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(splitLink),
});
