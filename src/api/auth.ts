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

export const authApi = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: 'mock-jwt-token-123',
                    user: { id: '1', email: data.email }
                })
            }, 1000)
        })
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    token: 'mock-jwt-token-456',
                    user: { id: '2', email: data.email, companyName: data.companyName }
                })
            }, 1000)
        })
    }
}