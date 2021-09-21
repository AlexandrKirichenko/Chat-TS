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
    setInputValue?: (value: string) => void;
    autoComplete: "on" | "off";
    inputError: string | undefined;
    touched?: boolean;
    onBlur?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    url?: string;
}


export interface AvatarProps {
    url?: string;
    nameAvatar: string;
    sizeAvatar?: string;
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
