import { http } from './http'

export interface BotConfig {
    id?: string
    name: string
    prompt: string
}

export interface FileData {
    id: string
    name: string
    size: number
    uploadDate: string
}

export interface TelegramIntegrationPayload {
    token: string
}

export interface TelegramIntegrationResponse {
    success: boolean
    message?: string
}

export async function getBotConfig(): Promise<BotConfig> {
    const response = await http.get<BotConfig>('/api/bot/config')
    return response.data
}

export async function updateBotConfig(data: BotConfig): Promise<BotConfig> {
    const response = await http.put<BotConfig>('/api/bot/config', data)
    return response.data
}

export async function getFiles(): Promise<FileData[]> {
    const response = await http.get<FileData[]>('/api/bot/files')
    return response.data
}

export async function uploadFile(file: File): Promise<FileData> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await http.post<FileData>('/api/bot/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export async function deleteFile(fileId: string): Promise<void> {
    await http.delete(`/api/bot/files/${fileId}`)
}

export async function connectTelegramIntegration(payload: TelegramIntegrationPayload): Promise<TelegramIntegrationResponse> {
    const response = await http.post<TelegramIntegrationResponse>('/api/integrations/telegram', payload)
    return response.data
}

export const botApi = {
    getBotConfig,
    updateBotConfig,
    getFiles,
    uploadFile,
    deleteFile,
    connectTelegramIntegration
}
