import React from 'react'

export interface RegistrationUserCredentials {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
    avatar?: string;
}


export interface InputProps {
    type?: "email" | "text" | "password";
    value: string;
    id?: string;
    name: string;
    size?: "small" | "large";
    autoComplete?: "on" | "off";
    inputError: string | undefined;
    touched?: boolean;
    onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    url?: string;
}


export interface AvatarProps {
    value?: string;
    nameAvatar: string;
    sizeAvatar?: string;
    setMenu?: (values: boolean) => void;
    userMenu?: boolean;
}

export interface AvatarInputProps {
    value: string;
    name: string;
    inputError: string | undefined;
    touched?: boolean;
    onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    url?: string;
    nameAvatar: string;
}

export interface MessageProp {
    id: string,
    description: string,
    userId: number,
    login: string;
    avatar?: string;
    itsMe: boolean;
}

export interface MessageItem {
    "user": {
        "login": string,
        "email": string,
        "avatar": string,
        "id": string
        }
        itsMe: boolean,
}
