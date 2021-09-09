import React, {createContext, useState} from 'react'

interface IContext{
    children: React.ReactNode;
    props: any;
}
export const AuthContext = createContext<IContext>({children, ...props}) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <AuthContext.Provider value={{
            inputValue: inputValue,
            setInputValue: setInputValue
        }}{...props}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext;


