export interface User {
    id: string
    email: string
    companyName?: string
}

export interface AuthResponse {
    token?: string
    user?: User
    message?: string
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

export interface VerifyEmailRequest {
    email: string
    code: string
}

export interface ResendVerificationRequest {
    email: string
}

// Берем адрес бекенда из файла .env
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const requestJson = async <T>(path: string, init: RequestInit): Promise<T> => {
    const response = await fetch(`${API_URL}${path}`, init)

    if (!response.ok) {
        let message = 'Ошибка запроса'
        try {
            const data = await response.json()
            message = data?.message || data?.error || message
        } catch {
            // ignore parsing errors and fall back to default message
        }
        throw new Error(message)
    }

    if (response.status === 204) {
        return {} as T
    }

    return response.json()
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    return requestJson<AuthResponse>('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    return requestJson<AuthResponse>('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export async function verifyEmail(data: VerifyEmailRequest): Promise<AuthResponse> {
    return requestJson<AuthResponse>('/api/auth/verify-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export async function resendVerificationCode(data: ResendVerificationRequest): Promise<AuthResponse> {
    return requestJson<AuthResponse>('/api/auth/verify-email/resend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const authApi = {
    login,
    register,
    verifyEmail,
    resendVerificationCode
}