export interface User {
    id: string
    email: string
    companyName?: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    companyName: string
    email: string
    password: string
}

// Берем адрес бекенда из файла .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const authApi = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Ошибка авторизации');
        }

        return response.json();
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Ошибка регистрации');
        }

        return response.json();
    }
}