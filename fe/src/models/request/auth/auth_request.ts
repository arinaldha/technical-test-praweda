export interface LoginRequest {
    username: string;
    password: string;
    
    remember?: boolean;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
    confirmationPassword: string;
}

export type LoginRequestSSO = {
    token_sso: string
    env: string
}