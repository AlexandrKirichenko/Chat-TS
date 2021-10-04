import React, {useContext, useMemo} from "react";
import {getApolloClient} from "./client";
import {ApolloProvider} from "@apollo/client";
import {appContext} from "./AppContext";

export const ApolloContext: React.FC = ({children}) => {
    const context = useContext(appContext);
    
    return useMemo(() =>
            <ApolloProvider client={getApolloClient(context?.token)}>
                {children}
            </ApolloProvider>,
        [children, context?.token])
}
