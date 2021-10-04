import React, {useState} from "react";

interface User {
    login: string;
    email: string;
    avatar: string;
    id: string;
}

interface IAppContext {
    isAuthorized: boolean;
    setIsAuthorized: (values: boolean) => void;
    user: User | null;
    setUser: (values: User | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}

export const appContext = React.createContext<IAppContext | null>(null);

export const AppContext: React.FC = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    
    const AuthContextData: IAppContext = {isAuthorized, setIsAuthorized, user, setUser, token, setToken};
    
    return <appContext.Provider value={AuthContextData}> {children} </appContext.Provider>
    
}
