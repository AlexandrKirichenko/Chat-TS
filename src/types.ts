import React from 'react'

export interface RegistrationUserCredentials {
    name: string;
    password: string;
    confirmPassword: string;
    email: string;
    url?: string;
}

export interface LoginUserCredentials {
    name: string;
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
    sizeAvatar: string;
    url?: string;
    name: string;
}
