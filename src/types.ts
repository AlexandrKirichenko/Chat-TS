import React from 'react'

export interface RegistrationUserCredentials {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
    url?: string;
}

export interface LoginUserCredentials {
    login: string;
    password: string;
}

export interface InputProps {
    type: "email" | "text" | "password";
    value: string;
    id: string;
    name: string;
    size?: "small" | "large";
    setInputValue?: (value: string) => void;
    autoComplete: "on" | "off";
    inputError: string | undefined;
    touched?: boolean;
    onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    url?: string;
}


export interface AvatarProps {
    sizeAvatar?: string;
    url?: string;
    nameAvatar: string;
}
