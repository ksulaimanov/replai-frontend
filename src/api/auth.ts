import { http } from './http'
import { getActivePinia } from 'pinia'
import { useAuthStore } from '../stores/auth'

export interface User {
    id: string
    email: string
    companyName?: string
}

export interface AuthResponse {
    token?: string
    email?: string
    companyName?: string
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


export interface ResendCodeResponse {
    success: boolean
    email: string
}


export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>('/api/auth/login', data)
    return response.data
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>('/api/auth/register', data)
    return response.data
}

export async function verifyEmail(data: VerifyEmailRequest): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>('/api/auth/verify-email', data)
    const payload = response.data

    if (payload.token) {
        localStorage.setItem('token', payload.token)
        if (getActivePinia()) {
            useAuthStore().setToken(payload.token)
        }
    }

    return payload
}

export async function resendCode(data: ResendVerificationRequest): Promise<ResendCodeResponse> {
    const response = await http.post<ResendCodeResponse>('/api/auth/resend-code', data)
    return response.data
}

export const authApi = {
    login,
    register,
    verifyEmail,
    resendCode
}